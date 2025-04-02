const multer = require("multer");
const path = require("path");

// Define Storage for Resumes
const storage = multer.diskStorage({
  destination: "./upload/resumes/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  },
});

// File Upload Filter (Only PDF allowed)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
