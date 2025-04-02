import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewPosts = () => {
  const navigate = useNavigate();
  const [photosOpen, setPhotosOpen] = useState(true);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://admin-1-49ek.onrender.com/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts');
      setLoading(false);
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
              <li onClick={() => navigate('/admin/add-post')}>Add Post</li>
              <li onClick={() => navigate('/admin/view-posts')} className="active">View All Photos</li>
            </ul>
          )}
          <li onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff4444' }}>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">Blind's Welfare Association</div>

        <div className="content-section">
          <h2>All Posts</h2>
          {error && <div className="error-message">{error}</div>}
          
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : (
            <div className="table-responsive">
              <table className="posts-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Content</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post._id}>
                      <td className="post-image">
                        {post.image ? (
                          <img 
                            src={`https://admin-1-49ek.onrender.com${post.image}`}
                            alt={post.title}
                          />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </td>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td className="post-content">
                        {post.content.length > 100 
                          ? `${post.content.substring(0, 100)}...` 
                          : post.content}
                      </td>
                      <td>{new Date(post.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPosts; 