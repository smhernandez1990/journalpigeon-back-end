const router = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Post = require("../models/post");
const verifyJwt = require("../middleware/verify-jwt");

//Create Comment
router.post("/", verifyJwt, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.postId,
      author: req.user._id,
      user_id: req.user._id,
    });

    post.comments.push(newComment._id);
    await post.save();

    await newComment.populate("author");
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message }).redirect('/error')
  }
});

//Update Comment
router.put("/:commentId", verifyJwt, async (req, res) => {
  try {
    const { body } = req.body;
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, author: req.user._id },
      { body },
      { new: true, runValidators: true },
    ).populate("author");

    if (!updatedComment)
      return res
        .status(404)
        .json({ error: "Comment not found or unauthorized" });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message }).redirect('/error')
  }
});

//Delete Comment 
router.delete("/:commentId", verifyJwt, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    const post = await Post.findById(req.params.postId);

    if (!comment || !post) return res.status(404).json({ error: "Not found" });

    const isCommentAuthor = comment.author.equals(req.user._id);
    const isPostAuthor = post.author.equals(req.user._id);

    if (isCommentAuthor || isPostAuthor) {
      await Comment.findByIdAndDelete(req.params.commentId);

      post.comments.pull(req.params.commentId);
      await post.save();

      return res.status(204).send();
    }

    res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    res.status(500).json({ error: error.message }).redirect('/error')
  }
});

module.exports = router;
