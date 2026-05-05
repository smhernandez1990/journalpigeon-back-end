const router = require('express').Router()
const Post = require('../models/post')
const verifyJwt = require('../middleware/verify-jwt')

//Create
router.post('/', verifyJwt, async (req, res) => {
    try {
        req.user._id === req.body.author
        const post = await Post.create(req.body)
        post._doc.author = req.user
        res.status(201).json(post)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Index
router.get('/', verifyJwt, async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('author')
            .sort({ createdAt: 'desc' })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Show
router.get('/:postId', verifyJwt, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).populate('author')
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Update
router.put('/:postId', verifyJwt, async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Delete
router.delete('/:postId', verifyJwt, async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

//Create Comment
router.post('/:postId/comments', verifyJwt, async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router