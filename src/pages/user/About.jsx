// import React from "react";
// import "./About.css";

// const About = () => {
//   return (
//     <div className="give-page">
//       <div className="about-section">
//         <div className="about-text">
//           <h2>About us</h2>
//           <p>
//             Vision for All: Blind’s Welfare Association is dedicated to
//             empowering visually impaired individuals through education,
//             vocational training, and employment opportunities. For over 48 years,
//             our NGO in Ulhasnagar, Maharashtra, has been transforming lives by
//             providing essential resources, skill development programs, and
//             community support.
//           </p>
//           <ul>
//             <li><strong>Educational Support:</strong> Offering free courses including academic assistance, and skill-based counseling.</li>
//             <li><strong>Vocational Training:</strong> Conducting handicraft workshops, music programs, and job placement opportunities.</li>
//             <li><strong>Community Assistance:</strong> Providing food distribution, financial aid, and counseling for families.</li>
//             <li><strong>Fundraising & Donations:</strong> Managing organized donation tracking and sponsorship programs to support beneficiaries.</li>
//           </ul>
//         </div>
//         <div className="about-image">
//           <img src="1.jpg" alt="About Us" />
//         </div>
//       </div>

//       <div className="founders-section">
//         <h3>Meet our Founders</h3>
//         <div className="founders">
//           <div className="founder-card">
//             <img src="fmen.png" alt="Mr. Jagdish Patil" />
//             <h4>Mr. Jagdish Patil</h4>
//             <p>Founder</p>
//             <p>Jagdish Patil is the founder of Blind’s Welfare Association.</p>
//           </div>
//           <div className="founder-card">
//             <img src="fwmen.png" alt="Mrs. Patil" />
//             <h4>Mrs. Patil</h4>
//             <p>Co-Founder</p>
//             <p>Mrs. Patil specializes in consulting initiatives and sustainably shaping user interfaces.</p>
//           </div>
//         </div>
//       </div>
//       <div className="feedback-section">
//         <h3>Feedback Form</h3>
//         <div className="feedback-container">
//           <div className="feedback-form">
//             <label>Name</label>
//             <input type="text" placeholder="Jane Smith" />

//             <label>Phone number*</label>
//             <input type="text" placeholder="555-555-5555" />

//             <label>Feedback</label>
//             <textarea placeholder="Write your feedback here..."></textarea>

//             <button type="submit">SUBMIT</button>
//           </div>
//           <div className="feedback-map">
//           <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.811372319881!2d73.1695862843415!3d19.210318482313408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79538e7c5e6a3%3A0x9c635a7e74cd9e9d!2sUlhasnagar%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
//               width="100%"
//               height="250"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//             ></iframe>
//           </div>
//         </div>
//         <div className="contact-info">
//           <div>
//             <strong>Get in touch</strong>
//             <p>blindwelfareassociation@gmail.com</p>
//           </div>
//           <div>
//             <strong>Location</strong>
//             <p>Ulhasnagar, Maharashtra India</p>
//           </div>
//           <div>
//             <strong>Hours</strong>
//             <p>Daily 9:00am - 10:00pm</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default About;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./About.css";

const About = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  // Fetch the last five feedbacks from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/feedbacks")
      .then((response) => {
        setFeedbacks(response.data.slice(0, 5)); // Get the latest 5 feedbacks
      })
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/feedbacks", formData);
      alert("Feedback submitted successfully!");

      // Refresh feedback list after submission
      axios.get("http://localhost:5000/api/feedbacks").then((response) => {
        setFeedbacks(response.data.slice(0, 5)); // Refresh with latest feedbacks
      });

      // Clear the form
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="give-page">
      <div className="about-section">
        <div className="about-text">
          <h2>About us</h2>
          <p>
            Vision for All: Blind’s Welfare Association is dedicated to
            empowering visually impaired individuals through education,
            vocational training, and employment opportunities. For over 48 years,
            our NGO in Ulhasnagar, Maharashtra, has been transforming lives by
            providing essential resources, skill development programs, and
            community support.
          </p>
          <ul>
            <li><strong>Educational Support:</strong> Offering free courses including academic assistance and counseling.</li>
            <li><strong>Vocational Training:</strong> Conducting handicraft workshops, music programs, and job placement.</li>
            <li><strong>Community Assistance:</strong> Providing food distribution, financial aid, and family support.</li>
            <li><strong>Fundraising & Donations:</strong> Managing donations and sponsorship programs.</li>
          </ul>
        </div>
        <div className="about-image">
          <img src="1.jpg" alt="About Us" />
        </div>
      </div>

      {/* Founders Section */}
      <div className="founders-section">
        <h3>Meet our Founders</h3>
        <div className="founders">
          <div className="founder-card">
            <img src="fmen.png" alt="Mr. Jagdish Patil" />
            <h4>Mr. Jagdish Patil</h4>
            <p>Founder</p>
            <p>Jagdish Patil is the founder of Blind’s Welfare Association.</p>
          </div>
          <div className="founder-card">
            <img src="fwmen.png" alt="Mrs. Patil" />
            <h4>Mrs. Patil</h4>
            <p>Co-Founder</p>
            <p>Mrs. Patil specializes in consulting initiatives and shaping user interfaces.</p>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="feedback-section">
        <h3>Feedback Form</h3>
        <div className="feedback-container">
          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              placeholder="Jane Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <label>Phone number*</label>
            <input
              type="text"
              placeholder="555-555-5555"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <label>Feedback</label>
            <textarea
              placeholder="Write your feedback here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>

            <button type="submit">SUBMIT</button>
          </form>

          <div className="feedback-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.811372319881!2d73.1695862843415!3d19.210318482313408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79538e7c5e6a3%3A0x9c635a7e74cd9e9d!2sUlhasnagar%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Display last 5 feedbacks */}
        <div className="feedback-list">
  <h3>Recent Feedback</h3>
  {feedbacks.length > 0 ? (
    <div className="feedback-container">
      {feedbacks.map((fb, index) => (
        <div key={index} className="feedback-card">
          <p className="feedback-name">{fb.name}</p>
          <p className="feedback-message">"{fb.message}"</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No feedbacks yet.</p>
  )}
</div>

      </div>
    </div>
  );
};

export default About;