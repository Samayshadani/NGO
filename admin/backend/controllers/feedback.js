const Feedback = require("../models/Feedback");

exports.submitFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error while saving feedback" });
    }
};

exports.getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ _id: -1 }).limit(5);
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching feedbacks" });
    }
};
