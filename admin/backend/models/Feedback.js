const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
}, { timestamps: true });

module.exports = mongoose.model("Feedback", FeedbackSchema);