const mongoose = require('mongoose')
const User = require('./user')
const Post = require('./post')

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        post_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Post'
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
    },
    { timestamps: true }
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment