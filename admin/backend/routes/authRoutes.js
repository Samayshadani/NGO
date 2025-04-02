const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post("/admin/signup", signup);
router.post("/admin/login", login);

module.exports = router;
