import express from "express";
const router = express.Router();
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config.js';


// User login route
router.post("/login", async (req, res) => {
  const { email } = req.body;
  let { password } = req.body
  password = password.trim() // trimming white space

  console.log("Login attempt for email:", email)

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
    console.log("User found in database:", user)

    if (!user) {
      console.log("User not found")
      return res.status(401).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    console.log("Password match result:", isMatch)

    if (!isMatch) {
      console.log("Password does not match")
      return res.status(401).json({ message: "Invalid login credentials" })
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: "Login successful!", token })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" })
  }
});

// registration route
router.post("/register", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase().trim(); // trimming any potential white space
  password = password.trim();
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ email, password });

    await user.save();

    // generate JWT token to log user in immediately after registration
    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error(err);
    // Check if this is a validation error
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') }); // Join all error messages
    }
    res.status(500).json({ message: "Server error during registration" });
  }
});

export default router