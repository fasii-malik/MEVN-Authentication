require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const corsOptions = require('./config/cors.js')
const connectDB = require('./config/database')
const credentials = require('./middleware/credentials')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authenticationMiddleware = require('./middleware/authentication')

const app = express();

connectDB();

app.use(credentials);

//CORS
app.use(cors(corsOptions));

//application.x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

// application/json response
app.use(express.json());

//middleware for cookie
app.use(cookieParser());

app.use(authenticationMiddleware)

//Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

const PORT = 3500;

//Default erro handler
app.use(errorHandlerMiddleware);

//Routes
app.use('/api/auth', require('./routes/api/auth'));

mongoose.connection.once('open', ()=>{
    console.log('Database Connected')
    app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`) });
})