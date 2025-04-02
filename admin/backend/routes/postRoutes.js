const express = require("express");
const { createPost, getAllPosts, getPostsByCategory, deletePost } = require("../controllers/postController");
const verifyToken = require("../middleware/auth");
const upload = require("../utils/multerConfig");

const router = express.Router();

// Upload image while creating a post
router.post("/admin/post", verifyToken, upload.single("image"), createPost);

// Get all posts
router.get("/posts", getAllPosts);

// Get posts by category
router.get("/posts/:category", getPostsByCategory);

// Delete a post
router.delete("/admin/post/:id", verifyToken, deletePost);

module.exports = router;
