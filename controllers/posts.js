const router = require('express').Router()
const Post = require('../models/post')
const Comment = require("../models/comment");
const verifyJwt = require('../middleware/verify-jwt')

//Create
router.post('/', verifyJwt, async (req, res) => {
    try {
        req.body.author = req.user._id;
        req.body.user_id = req.user._id;
        const post = await Post.create(req.body)
        post._doc.author = req.user
        post._doc.user_id = req.user
        return res.status(201).json(post)
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
})

//Index
router.get('/', verifyJwt, async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('author')
            .sort({ createdAt: 'desc' })
        return res.status(200).json(posts)
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
})

//Show
router.get("/:postId", verifyJwt, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author")
      .populate({
        path: "comments",
        populate: { path: "author" }, 
      });

    if (!post) return res.status(404).json({ error: "Post not found" });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

//Update
router.put("/:postId", verifyJwt, async (req, res) => {
  try {
    const updatePost = await Post.findOneAndUpdate(
      { _id: req.params.postId, user_id: req.user._id },
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatePost)
      return res.status(404).json({ error: "Unauthorized or not found" });

    await updatePost.populate("author");
    return res.status(200).json(updatePost);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
});

//Delete
router.delete('/:postId', verifyJwt, async (req, res) => {
    try {
        const deletePost = await Post.findOneAndDelete({
          _id: req.params.postId,
          user_id: req.user._id,
        });

        if (!deletePost)
          return res.status(404).json({ error: "Unauthorized or not found" });
        
        await Comment.deleteMany({ post_id: req.params.postId });

        return res.status(204).send();
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
})

module.exports = router
