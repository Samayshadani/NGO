const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) return res.status(400).json({ error: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword });

    await newAdmin.save();
    res.json({ success: true, message: "Admin created successfully" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ admin: { id: admin._id } }, process.env.JWT_SECRET);
    res.json({ success: true, token });
};
