import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Event.css";

const Events = () => {
  const [pastEvents, setPastEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://admin-1-49ek.onrender.com/posts");
      setPastEvents(response.data.filter(post => post.category === "past-event"));
      setUpcomingEvents(response.data.filter(post => post.category === "upcoming-event"));
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch event posts");
      setLoading(false);
    }
  };

  return (
    <div className="events-page">
      <div className="events-section upcoming-events">
        <h2 className="h21">UPCOMING EVENTS</h2>
        <div className="events-grid">
          {loading ? <p>Loading...</p> : error ? <p>{error}</p> : upcomingEvents.map((post) => (
            <div key={post._id} className="event-card">
              <img src={`https://admin-1-49ek.onrender.com${post.image}`} alt={post.title} />
              <p>{post.content}</p>
              <strong><p>{new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p></strong>


            </div>
          ))}
        </div>
      </div>
      <div className="events-section past-events">
        <h2 className="h21">PAST EVENTS</h2>
        <div className="events-grid">
          {loading ? <p>Loading...</p> : error ? <p>{error}</p> : pastEvents.map((post) => (
            <div key={post._id} className="event-card">
              <img src={`https://admin-1-49ek.onrender.com${post.image}`} alt={post.title} />
              <p>{post.content}</p>
              <strong><p>{new Date(post.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })}</p></strong>


            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
