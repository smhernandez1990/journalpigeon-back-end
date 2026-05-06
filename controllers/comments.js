const router = require('express').Router()
const Comment = require('../models/comment')
const verifyJwt = require('../middleware/verify-jwt')

router.put("/:commentId", verifyJwt, async (req, res) => {
  try {
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, author: req.user._id },
      req.body,
      { new: true, runValidators: true },
    ).populate("author");

    if (!updatedComment)
      return res
        .status(404)
        .json({ error: "Comment not found or unauthorized" });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:commentId", verifyJwt, async (req, res) => {
  try {
    const deletedComment = await Comment.findOneAndDelete({
      _id: req.params.commentId,
      author: req.user._id,
    });

    if (!deletedComment)
      return res
        .status(404)
        .json({ error: "Comment not found or unauthorized" });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router