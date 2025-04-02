const express = require("express");
const router = express.Router();
const { submitFeedback, getFeedbacks } = require("../controllers/feedback");

// const feedbackRoutes = require("./routes/feedbackRoutes");
router.get("/api/feedbacks",getFeedbacks);
router.post("/api/feedbacks",submitFeedback);
module.exports = router;
