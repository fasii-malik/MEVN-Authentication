const allowedOrigins = require('../config/allowed-origins')

const credentials = (req, res, next) => {
    const origin = req.header.origin;

    if(allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Origin' , true)
        res.header('Access-Control-Allow-Credentials' , true)
    }

    next();
}

module.exports = credentials;