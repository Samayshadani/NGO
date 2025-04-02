import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminVolunteers = ({ handleLogout }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [photosOpen, setPhotosOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVolunteers();
  }, []);
  const fetchVolunteers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/volunteers");
      // Filter out the accepted/rejected volunteers
      const filteredVolunteers = response.data.filter(
        (volunteer) => volunteer.status === "Pending"
      );
      setVolunteers(filteredVolunteers); // Set only pending volunteers
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };
  
  const openResume = (fileName) => {
    window.open(`/upload/resumes/${fileName}`, "_blank");
  };

  const handleAccept = async (volunteerId, email) => {
    try {
      const response = await axios.post("http://localhost:5000/api/volunteers/decision", {
        email,
        decision: "Accepted",
      });
      alert(response.data.message);
      
      // Remove the accepted volunteer from the state
      setVolunteers(volunteers.filter((vol) => vol.email !== email));
    } catch (error) {
      console.error("Error accepting volunteer:", error);
    }
  };

  const handleReject = async (volunteerId, email) => {
    try {
      const response = await axios.post("http://localhost:5000/api/volunteers/decision", {
        email,
        decision: "Rejected",
      });
      alert(response.data.message);

      // Remove the rejected volunteer from the state
      setVolunteers(volunteers.filter((vol) => vol.email !== email));
    } catch (error) {
      console.error("Error rejecting volunteer:", error);
    }
  };

  return (
    <div className="app-container">
      {/* ✅ Sidebar remains the same */}
      <div className="sidebar">
        <div className="sidebar-title">Master Admin</div>
        <ul>
          <li onClick={() => navigate("/admin/dashboard")} className="active">Dashboard</li>
          <li onClick={() => navigate("/admin/volunteers")}>Volunteer</li>
          <li onClick={() => navigate("/admin/donations")}>Donations Received</li>
          <li className="photos-menu" onClick={() => setPhotosOpen(!photosOpen)}>
            Photos <span className={`arrow ${photosOpen ? "open" : ""}`}>&#9662;</span>
          </li>
          {photosOpen && (
            <ul className="dropdown">
              <li onClick={() => navigate("/admin/add-post")}>Add Post</li>
              <li onClick={() => navigate("/admin/view-posts")}>View All Photos</li>
            </ul>
          )}
          <li onClick={handleLogout} style={{ cursor: "pointer", color: "#ff4444" }}>Logout</li>
        </ul>
      </div>

      {/* ✅ Main content area remains the same */}
      <div className="main-content">
        <h2>Volunteer Applications</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Event</th>
              <th>Comments</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.length > 0 ? (
              volunteers.map((vol) => (
                <tr key={vol._id}>
                  <td>{vol.fullName}</td>
                  <td>{vol.email}</td>
                  <td>{vol.phone}</td>
                  <td>{vol.event}</td>
                  <td>{vol.comments}</td>
                  <td>
                    {vol.resumePath ? (
                      <a
                        href={`http://localhost:5000/upload/${vol.resumePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄 View
                      </a>
                    ) : (
                      "No Resume"
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleAccept(vol._id, vol.email)}>✅ Accept</button>
                    <button onClick={() => handleReject(vol._id, vol.email)}>❌ Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No volunteer applications available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVolunteers;
