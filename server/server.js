const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const ContactUs = require("./models/contactUs.js"); // Capitalized model name for consistency
require("dotenv").config({ path: path.join(__dirname, ".env") }); // To use environment variables

const app = express();
const PORT = process.env.PORT || 7080;
const MONGO_URI =
  process.env.MONGO_URI_CLUSTER || "mongodb://127.0.0.1:27017/matrico_ayurveda_shoppee";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const apiRoutes = require("./routes/api.js");
app.use("/api/v1", apiRoutes);
app.use("/auth", authRoutes);
app.post("/contact", async (req, res) => {
  const { username, email, message } = req.body;

  // Basic input validation
  if (!username || !email || !message) {
    const errorMessage = "All fields are required";
    console.error(errorMessage); // Log the error to the server console
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const newContact = new ContactUs({ username, email, message });
    await newContact.save();

    // Response indicating success
    res.status(201).json({
      message: "Contact information saved successfully",
      contact: newContact, // Optionally return the saved contact
    });
  } catch (err) {
    const errorMessage = "Error saving contact info. Please try again later.";
    console.error("Error saving contact info:", err.message); // Log detailed error

    // Response to frontend with a user-friendly message
    res.status(500).json({ message: errorMessage });
  }
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
// console.log(`Server running on https://matrico-ayurveda-shoppe.onrender.com`)
);
// Reload trigger: loaded consolidated Gemini API Key
