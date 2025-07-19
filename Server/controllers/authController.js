const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function register(req, res){
    const { username, email, firstName, lastName, password, confirmPassword,} = req.body;

    if( !username || !email || !firstName || !lastName || !password || !confirmPassword ) return res.status(422).json({'message' : 'invalid fields'});

    if(password !== confirmPassword) return res.status(422).json({'message': 'Password do not match!'});

    const userExists = await User.exists({email}).exec();

    if(userExists) return res.status(409);

    try{
        // hashedPassword = bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await User.create( {username, email, password: hashedPassword, firstName, lastName});

        res.status(201).json({ message: 'User created successfully' });

    } catch(error){
        console.log(error);
    }

}

async function login(req, res){
    const { email, password} = req.body;

    if(!email || !password) return res.status(422).json({'message' : 'invalid fields'});

    const user = await User.findOne({email});

     if(!user) return res.status(401).json({'message' : 'User do not exist'});

     const match = await bcrypt.compare(password, user.password);

     if(!match) return res.status(401).json({'message' : 'Password is Incorrect'});

     const accessToken = jwt.sign(
        {id: user.id},
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1800s'
        })

        const refreshToken = jwt.sign(
        {id: user.id},
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1D'
        })

        user.refresh_token = refreshToken;
        await user.save();

        res.cookie('refresh_token', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
        res.json({access_token: accessToken});

}

async function logout(req, res){
  const cookies = req.cookies

  if(!cookies.refresh_token) return res.sendStatus(204)

  const refreshToken = cookies.refresh_token
  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user){
    res.clearCookie('refresh_token', {httpOnly: true})
    return res.sendStatus(204)
  }

  user.refresh_token = null
  await user.save()

  res.clearCookie('refresh_token', {httpOnly: true})
  res.sendStatus(204)
}

async function refresh(req, res){
  const cookies = req.cookies
  if(!cookies.refresh_token) return res.sendStatus(401)

  const refreshToken = cookies.refresh_token

  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user) return res.sendStatus(403)

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if(err || user.id !== decoded.id) return res.sendStatus(403)

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1800s' }
      )

      res.json({access_token: accessToken})
    }
  )
}


async function user(req, res){
  
  const user = req.user

  return res.status(200).json(user)
}

module.exports = {register, login, logout, refresh, user}