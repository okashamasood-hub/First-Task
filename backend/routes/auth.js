const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = require("../models/userModel");
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("BODY:", req.body); 

  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  console.log("PASSWORD MATCH:", isMatch); 

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    "secretkey",
    { expiresIn: "1h" }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    }
  });
});

module.exports = router;