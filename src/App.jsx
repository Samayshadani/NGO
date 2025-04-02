import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Events from "./pages/user/Events";
import Volunteer from "./pages/user/Volunteer";
import Donation from "./pages/user/Donation";
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminVolunteers from "./pages/admin/AdminVolunteers";
import AddPost from "./pages/admin/AddPost";
import Donations from "./pages/admin/Donations";
import ViewPosts from "./pages/admin/ViewPosts";
import "./App.css";

// ✅ Protected Route for Admin Pages
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token);
  return token ? children : <Navigate to="/admin/login" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        {/* ✅ Public Routes (User Side) */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donation" element={<Donation />} />

        {/* ✅ Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ✅ Protected Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/volunteers" element={<ProtectedRoute><AdminVolunteers /></ProtectedRoute>} />
        <Route path="/admin/add-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
        <Route path="/admin/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
        <Route path="/admin/view-posts" element={<ProtectedRoute><ViewPosts /></ProtectedRoute>} />
      </Routes>
      {!isAdminRoute && <Footer />} 
    </>
  );
};
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};


export default App;
