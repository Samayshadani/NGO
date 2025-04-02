const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  note: { type: String },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now } ,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);
