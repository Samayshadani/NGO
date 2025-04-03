const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },  // Stores image path
    // date: { type: Date, default: Date.now }
    date: { type: String, required: true }, // Store user-entered date

});

module.exports = mongoose.model("Post", PostSchema);
