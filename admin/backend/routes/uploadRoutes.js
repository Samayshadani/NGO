const express = require("express");
const upload = require("../utils/multerConfig");
const router = express.Router();

router.post("/upload", upload.single('post'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/upload/images/${req.file.filename}`
    });
});

module.exports = router;
