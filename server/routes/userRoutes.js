// const express = require("express");
// const User = require("../models/user.js");
// const router = express.Router();

// // Create a new user
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const newUser = new User({ name, email, password });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get all users
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
