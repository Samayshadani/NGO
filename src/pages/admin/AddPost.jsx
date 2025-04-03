import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const navigate = useNavigate();
  const [photosOpen, setPhotosOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    date: '',
    image: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUploading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login first');
        return;
      }

      // Prepare FormData
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('date', formData.date);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      // Send request to backend
      const response = await axios.post('https://admin-1-49ek.onrender.com/admin/post', formDataToSend, {
        headers: {
          'auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Post created successfully!');
      setUploading(false);
      setTimeout(() => {
        navigate('/admin/view-posts'); 
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating post');
      setUploading(false);
    }
  };

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
          <li onClick={() => navigate('/admin/donations')}>Donations Received</li>
          <li
            className="photos-menu"
            onClick={() => setPhotosOpen(!photosOpen)}
          >
            Photos{" "}
            <span className={`arrow ${photosOpen ? "open" : ""}`}>&#9662;</span>
          </li>
          {photosOpen && (
            <ul className="dropdown">
              <li onClick={() => navigate('/admin/add-post')} className="active">Add Post</li>
              <li onClick={() => navigate('/admin/view-posts')}>View All Photos</li>
            </ul>
          )}
          <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4444' }}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">Blind's Welfare Association</div>

        <div className="content-section">
          <h2>Add New Post</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                <option value="home">Home</option>
                <option value="past-event">Past Events</option>
                <option value="upcoming-event">Upcoming Events</option>
                <option value="stories">Stories</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image (Optional)</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-button" 
              disabled={uploading}
            >
              {uploading ? 'Creating Post...' : 'Create Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
