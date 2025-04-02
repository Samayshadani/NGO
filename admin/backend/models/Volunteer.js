const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  event: { type: String, required: true },
  comments: { type: String },
  resumePath: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
});

module.exports = mongoose.model("Volunteer", volunteerSchema);
 