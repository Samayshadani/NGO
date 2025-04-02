const Volunteer = require("../models/Volunteer");
const nodemailer = require("nodemailer");

// Submit Volunteer Application
exports.applyVolunteer = async (req, res) => {
  try {
    const { fullName, email, phone, event, comments } = req.body;
    const resumePath = req.file ? `/resumes/${req.file.filename}` : null;

    const volunteer = new Volunteer({ fullName, email, phone, event, comments, resumePath });
    await volunteer.save();

    res.status(201).json({ message: "Application submitted successfully", volunteer });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ message: "Server Error" });
  }
  console.log("Received data:", req.body);
console.log("Received file:", req.file);
};

// Get all volunteer applications
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json(volunteers);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateVolunteerStatus = async (req, res) => {
  try {
    const { email, decision } = req.body; // Ensure decision comes from req.body
    let volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    volunteer.status = decision;
    await volunteer.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const subject = decision === "Accepted" ? "Application Approved" : "Application Rejected";
    const text =
      decision === "Accepted"
        ? `Dear ${volunteer.fullName},\n\nYour volunteer application has been approved! 🎉\n\nBest Regards,\nYour Organization`
        : `Dear ${volunteer.fullName},\n\nWe regret to inform you that your application has been rejected. 😔\n\nBest Regards,\nYour Organization`;

    await transporter.sendMail({ from: process.env.EMAIL_USER, to: email, subject, text });

    res.json({ message: `Volunteer ${decision.toLowerCase()} and email sent.` });
  } catch (error) {
    console.error("Error updating volunteer status:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
