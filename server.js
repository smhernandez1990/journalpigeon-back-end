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
const corsConfig = require('./middleware/corsConfig')

require('./db/connection')

const corsOptions = {
    origin: 'https://journal-pigeon.netlify.app',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger('dev'));

// Routes
app.use('/auth', authController)
app.use('/users', usersController)
app.use('/posts', postsController)
app.use("/posts/:postId/comments", commentsController);

app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(3000, () => {
    console.log('Microphone Check One Two What Is This');
});