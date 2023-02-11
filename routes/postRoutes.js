const express = require('express')
const router = express.Router();
const { createPost, likeAndUnlikePost, deletePost, updatePost, getPost , addComment, deleteComment  } = require("../controllers/postController")
const { isAuthenticated } = require("../middleware/auth")


router.route("/api/create").post(isAuthenticated, createPost); // Create Post

router
   .route("/api/post/:id")
   .get(isAuthenticated, likeAndUnlikePost) // like Post
   .delete(isAuthenticated, deletePost) // Delete Post
   .put(isAuthenticated, updatePost) // Update Post

router.route("/api/getpost/:id").get(getPost); // Get Post

router
    .route("/api/comment/:id")
    .put(isAuthenticated, addComment)
    .delete(isAuthenticated, deleteComment)

module.exports = router;