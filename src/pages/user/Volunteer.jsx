import React, { useState } from "react";
import axios from "axios";
import "./Volunteer.css";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    event: "",
    comments: "",
    resume: null,
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("event", formData.event);
    data.append("comments", formData.comments);
    data.append("resume", formData.resume);

    try {
      await axios.post("https://admin-1-49ek.onrender.com/api/volunteers/apply", data);
      alert("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        event: "",
        comments: "",
        resume: null,
      });
    } catch (error) {
      console.error("Error submitting application", error);
      alert("Failed to submit application.");
    }
  };

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <div className="overlay"></div>
        <img src="Vol.jpg" alt="Volunteer Work" className="hero-image" />
        <div className="hero-content">
          <h1>Join Our Cause</h1>
          <p>Empowering communities through dedicated volunteer work</p>
          <button className="apply-btn">Apply Now</button>
        </div>
      </div>

      {/* Application Form */}
      <div className="form-container">
        <h2>Application Form</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              className="input-field"
              placeholder="John Smith"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="johndoe@org.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              className="input-field"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Preferred Event</label>
            <input
              type="text"
              name="event"
              className="input-field"
              placeholder="Event"
              value={formData.event}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Additional Comments</label>
            <textarea
              name="comments"
              className="input-field"
              placeholder="Write your message here..."
              value={formData.comments}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Upload Resume (PDF only)</label>
            <input
              type="file"
              name="resume"
              className="input-field"
              accept="application/pdf"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Volunteer;
