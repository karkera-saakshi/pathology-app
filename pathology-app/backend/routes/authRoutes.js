const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();


// Send OTP
router.post(
  "/send-otp",
  authController.sendOTP
);


// Verify OTP and create account
router.post(
  "/verify-otp",
  authController.verifyOTP
);


// Login
router.post(
  "/login",
  authController.loginUser
);


module.exports = router;