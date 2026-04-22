const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const users = require("../models/userModel");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET || "secretkey",
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

module.exports = router;
