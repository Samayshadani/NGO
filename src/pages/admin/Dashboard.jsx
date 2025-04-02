import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
const Dashboard = () => {
    const [photosOpen, setPhotosOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    const stats = {
        totalPhotos: 24,
        totalVolunteers: 15,
        totalDonations: 45000,
    };

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="sidebar-title">Master Admin</div>
                <ul>
                    <li onClick={() => navigate("/admin/dashboard")} className="active">Dashboard</li>
                    <li onClick={() => navigate("/admin/volunteers")}>Volunteer</li> {/* Fixed path */}
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

            <div className="main-content">
                <div className="header">Blind's Welfare Association</div>
                <div className="dashboard-cards">
                    <div className="card">
                        <div className="card-icon">📸</div>
                        <div className="card-content">
                            <h3>Total Photos</h3>
                            <div className="card-value">{stats.totalPhotos}</div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-icon">👥</div>
                        <div className="card-content">
                            <h3>Total Volunteers</h3>
                            <div className="card-value">{stats.totalVolunteers}</div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-icon">💰</div>
                        <div className="card-content">
                            <h3>Total Donations</h3>
                            <div className="card-value">₹{stats.totalDonations}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;