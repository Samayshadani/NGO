const express = require("express");
const router = express.Router();
const { applyVolunteer, getVolunteers, updateVolunteerStatus } = require("../controllers/volunteerController");
const upload = require("../middleware/uploadMiddleware");

// Routes
router.post("/apply", upload.single("resume"), applyVolunteer);  // Submit form
router.get("/", getVolunteers);  // Get all applications
router.post("/decision", updateVolunteerStatus);  // Accept/Reject
module.exports = router;
