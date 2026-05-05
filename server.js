const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const testController = require('./controllers/test-jwt')
const authController = require('./controllers/auth')
const usersController = require('./controllers/users')
const verifyJwt = require('./middleware/verify-jwt')

require('./db/connection')

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes

app.use('/test-jwt', testController)
app.use('/auth', authController)
app.use(verifyJwt) //auth check
app.use('/users', usersController)

app.listen(3000, () => {
    console.log('The express app is ready!');
});