// controllers/authController.js
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = (req, res) => {
  User.registerUser(req.body)
    .then((result) => {
        if (result.success === false) {
        // 2. If success is false, send a 400 Bad Request and the model's message
        return res.status(400).json({ error: result.message });
      }
      // Send HTTP response + JWT token
      res.status(201).json({
        message: "Signup Successful",
        token: generateToken(result.insertedId)
      });
    })
    .catch((err) => {
      // Handle duplicates or database errors
      res.status(err.status || 500).json({ error: err.message });
    });
};

const loginUser = (req, res) => {
  User.loginUser(req.body)
    .then((result) => {
        if (result.success === false) {
        // 2. If success is false, send a 400 Bad Request and the model's message
        return res.status(400).json({ error: result.message });
      }
      // Send HTTP response + JWT token
      res.status(200).json({
        message: "Login Successful",
        token: generateToken(result.user._id)
      });
    })
    .catch((err) => {
      // Handle invalid credentials or database errors
      res.status(err.status || 401).json({ error: err.message });
    });
};

module.exports = { registerUser, loginUser };