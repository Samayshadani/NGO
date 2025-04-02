require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
// const port = process.env.PORT || 5000;
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static('upload/images'));
app.use("/upload", express.static("upload"));
  // Serve uploaded resumes

// Connect Database
connectDB();

// Routes
app.use(require("./routes/authRoutes"));
app.use(require("./routes/postRoutes"));
app.use(require("./routes/uploadRoutes"));
app.use(require("./routes/donationRoutes"));
app.use("/api/volunteers", require("./routes/volunteerRoutes"));  // ✅ Add this line
app.use(require("./routes/feedback"));


// Start Server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
