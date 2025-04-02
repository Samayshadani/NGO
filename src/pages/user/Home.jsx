import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [homePosts, setHomePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHomePosts();
  }, []);

  const fetchHomePosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      const filteredPosts = response.data.filter(post => post.category === "home");
      setHomePosts(filteredPosts);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch home posts");
      setLoading(false);
    }
  };

  return (
    <div className="give-page">
      <div className="mission-section">
        <img src="Banner.png" alt="Mission Background" className="mission-image" />
      </div>
      <div style={{padding: 10, fontSize: 25}}>Media</div>
      <div className="image-grid">
        {loading ? <p>Loading...</p> : error ? <p>{error}</p> : homePosts.map((post) => (
          <div key={post._id} className="image-card">
            <img src={`http://localhost:5000${post.image}`} alt={post.title} />
            <p>{post.content}</p>
            <strong><p>{new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p></strong>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
