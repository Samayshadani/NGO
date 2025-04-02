import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Donations = () => {
  const navigate = useNavigate();
  const [photosOpen, setPhotosOpen] = useState(false);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/donate")
      .then((res) => res.json())
      .then((data) => setDonations(data))
      .catch((err) => console.error("Error fetching donations:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-title">Master Admin</div>
        <ul>
          <li onClick={() => navigate('/admin/dashboard')}>Dashboard</li>
          <li>Volunteer</li>
          <li onClick={() => navigate('/admin/donations')} className="active">Donations Received</li>
          <li className="photos-menu" onClick={() => setPhotosOpen(!photosOpen)}>
            Photos <span className={`arrow ${photosOpen ? "open" : ""}`}>&#9662;</span>
          </li>
          {photosOpen && (
            <ul className="dropdown">
              <li onClick={() => navigate('/admin/add-post')}>Add Post</li>
              <li>View All Photos</li>
            </ul>
          )}
          <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4444' }}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">Blind's Welfare Association</div>

        <div className="content-section">
          <h2>Donation Reports</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Email Address</th>
                <th>Address</th>
                <th>Note</th>
                <th>Amount</th> 
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.length > 0 ? (
                donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>{donation.name}</td>
                    <td>{donation.phone}</td>
                    <td>{donation.email}</td>
                    <td>{donation.address}</td>
                    <td>{donation.note}</td>
                    <td>Rs. {donation.amount}</td> 
                    <td>{new Date(donation.date).toLocaleDateString()}</td> 
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No donations received yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="content-section">
          <h2>Funds Requirement</h2>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Total Fund Required</th>
                <th>Received</th>
                <th>Required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Food</td>
                <td>100000</td>
                <td>0</td>
                <td>100000</td>
              </tr>
              <tr>
                <td>Marriage</td>
                <td>500000</td>
                <td>2000</td>
                <td>498000</td>
              </tr>
              <tr>
                <td>Education</td>
                <td>500000</td>
                <td>2000</td>
                <td>498000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donations;
