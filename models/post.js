const mongoose = require('mongoose')
const User = require('./user')
const Comment = require('./comment')

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        mood: String,
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        comments: [Comment],
        tags: [String],
    },
    { timestamps: true },
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post