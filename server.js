const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const authController = require('./controllers/auth')
const usersController = require('./controllers/users')
const postsController = require('./controllers/posts')
const commentsController = require('./controllers/comments')
const verifyJwt = require('./middleware/verify-jwt')

require('./db/connection')

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authController)
app.use('/users', usersController)
app.use('/posts', postsController)
app.use('/comments', commentsController)

app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(3000, () => {
    console.log('The express app is ready!');
});