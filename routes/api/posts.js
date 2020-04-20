const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const isAuthenticated = require("../../middleware/auth");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   POST api/posts/
// @desc    Create a post
// @access  Private
router.post(
  "/",
  isAuthenticated,
  check("text", "Text is required").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    try {
      const user = await User.findOne({ _id: req.user.id }).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const savedPost = await newPost.save();
      res.json({
        msg: "Post created successfully",
        post: savedPost,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

// @route   GET api/posts/
// @desc    GET all posts
// @access  Private

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 }); //date=-1 sorts in newest first order
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   GET api/posts/:postId
// @desc    GET a post by ID
// @access  Private

router.get("/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   DELETE api/posts/
// @desc    DELETE a post
// @access  Private

router.delete("/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }
    // check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({
        error: "User not authorized",
      });
    }

    // remove post
    await post.remove();
    res.json({
      msg: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   PUT api/posts/like/:postId
// @desc    Like a post
// @access  Private
router.put("/like/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const loggedInuser = await User.findById(req.user.id);
    // check if post is already liked by logged in user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ error: "Post already liked" });
    }

    post.likes.unshift({
      user: req.user.id,
      name: loggedInuser.name,
      avatar: loggedInuser.avatar,
    });
    await post.save();

    res.json({
      msg: "Post liked",
      likes: post.likes,
      count: post.likes.length,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   PUT api/posts/unlike/:postId
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:postId", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    // check if post is liked by logged in user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ error: "Post has not yet been liked" });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json({
      msg: "Post unliked",
      likes: post.likes,
      count: post.likes.length,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

// @route   POST api/posts/comment/:postId
// @desc    Comment on post
// @access  Private
router.post(
  "/comment/:postId",
  isAuthenticated,
  check("text", "Text is required").isLength({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
      });
    }

    try {
      const user = await User.findOne({ _id: req.user.id }).select("-password");
      const post = await Post.findById({ _id: req.params.postId });

      const newComent = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComent);

      await post.save();
      res.json({
        msg: "Comment Added successfully",
        comments: post.comments,
        count: post.comments.length,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

// @route   DELETE api/posts/comment/:postId/:commentId
// @desc    DELETE a Comment
// @access  Private
router.delete(
  "/comment/:postId/:commentId",
  isAuthenticated,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id }).select("-password");
      const post = await Post.findById(req.params.postId);

      // Pull out comment
      const comment = post.comments.find(
        (comment) => comment.id === req.params.commentId
      );

      // check comment exist
      if (!comment) {
        return res.status(404).json({
          error: "Comment doesnt exists",
        });
      }

      // check user has autorization to delete
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({
          error: "User not authorized",
        });
      }

      const removeIndex = post.comments
        .map((comment) => {
          return comment._id;
        })
        .indexOf(req.params.commentId);
      post.comments.splice(removeIndex, 1);
      await post.save();

      res.json({
        msg: "Comment Deleted successfully",
        comments: post.comments,
        count: post.comments.length,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
);

// @route   GET api/posts/allikes/:postId/
// @desc    GET a Comment
// @access  Private
router.get("/allikes/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});
module.exports = router;
