const Post = require("../models/Post");
const path = require("path");

exports.createPost = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging log
        console.log("Uploaded File:", req.file); // Debugging log

        const { title, content, category } = req.body;
        if (!title || !content || !category) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Image URL to be stored
        const imageUrl = req.file ? `/upload/${req.file.filename}` : null;

        // Save post to DB
        const newPost = new Post({ title, content, category, image: imageUrl });
        await newPost.save();

        res.status(201).json({ success: true, message: "Post uploaded successfully", post: newPost });
    } catch (error) {
        console.error("Error saving post:", error);
        res.status(500).json({ success: false, message: "Failed to save post", error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch posts", error });
    }
};

exports.getPostsByCategory = async (req, res) => {
    try {
        const posts = await Post.find({ category: req.params.category }).sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch posts by category", error });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Delete associated image file
        if (post.image) {
            const imagePath = path.join(__dirname, "../", post.image);
            fs.unlink(imagePath, (err) => {
                if (err) console.log("Failed to delete image:", err);
            });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete post", error });
    }
};
