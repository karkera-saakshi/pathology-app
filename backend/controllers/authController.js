const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const User = require("../models/User");
const Otp = require("../models/Otp");

const generateToken = require("../utils/generateToken");
const sendOTPEmail = require("../utils/sendEmail");


// =====================================================
// SEND OTP
// =====================================================

const sendOTP = async (req, res) => {
  try {

    const { email, password, role } = req.body;


    // Check required fields
    if (!email || !password || !role) {

      return res.status(400).json({
        error: "Email, password and role are required",
      });

    }


    // Convert email to lowercase
    const normalizedEmail =
      email.toLowerCase().trim();


    // Check if user already exists
    const userExists =
      await User.findUserByEmail(
        normalizedEmail
      );


    if (userExists) {

      return res.status(400).json({
        error: "User already exists",
      });

    }


    // Generate secure 6-digit OTP
    const otp = crypto
      .randomInt(100000, 1000000)
      .toString();


    // Hash password
    const passwordHash =
      await bcrypt.hash(password, 10);


    // Save hashed OTP and hashed password
    await Otp.saveOTP(
      normalizedEmail,
      otp,
      passwordHash,
      role
    );


    // Send actual OTP to user's email
    await sendOTPEmail(
      normalizedEmail,
      otp
    );


    console.log(
      `OTP sent successfully to ${normalizedEmail}`
    );


    return res.status(200).json({
      message: "OTP sent successfully",
    });


  } catch (err) {

    console.error(
      "Send OTP error:",
      err
    );

    return res.status(500).json({
      error: "Could not send OTP",
    });

  }
};



// =====================================================
// VERIFY OTP
// =====================================================

const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;


    // Check fields
    if (!email || !otp) {

      return res.status(400).json({
        error: "Email and OTP are required",
      });

    }


    // Normalize email
    const normalizedEmail =
      email.toLowerCase().trim();


    // Find OTP record
    const otpData =
      await Otp.getOTP(
        normalizedEmail
      );


    if (!otpData) {

      return res.status(400).json({
        error: "OTP not found",
      });

    }


    // Check maximum attempts
    if (otpData.attempts >= 5) {

      await Otp.deleteOTP(
        normalizedEmail
      );

      return res.status(400).json({
        error:
          "Too many incorrect attempts. Please request a new OTP.",
      });

    }


    // Verify hashed OTP
    const correctOTP =
      Otp.verifyOTPHash(
        otp,
        otpData.otpHash
      );


    // Wrong OTP
    if (!correctOTP) {

      const col =
        require("../config/db")
          .getOtpCollection();


      await col.updateOne(
        {
          _id: otpData._id,
        },
        {
          $inc: {
            attempts: 1,
          },
        }
      );


      return res.status(400).json({
        error: "Invalid OTP",
      });

    }


    // =================================================
    // OTP IS CORRECT
    // =================================================

    // Create permanent user
    // Password is already hashed
    const result =
      await User.registerUser({

        email:
          otpData.email,

        passwordHash:
          otpData.passwordHash,

        role:
          otpData.role,

      });


    // Check if registration failed
    if (result.success === false) {

      return res.status(400).json({
        error: result.message,
      });

    }


    // Delete OTP after successful registration
    await Otp.deleteOTP(
      normalizedEmail
    );


    return res.status(201).json({

      message: "Signup Successful",

      token:
        generateToken(
          result.insertedId
        ),

    });


  } catch (err) {

    console.error(
      "Verify OTP error:",
      err
    );

    return res.status(500).json({
      error: err.message,
    });

  }
};



// =====================================================
// LOGIN
// =====================================================

const loginUser = async (req, res) => {

  try {

    const result =
      await User.loginUser(
        req.body
      );


    if (result.success === false) {

      return res.status(400).json({
        error: result.message,
      });

    }


    return res.status(200).json({

      message: "Login Successful",

      token:
        generateToken(
          result.user._id
        ),

    });


  } catch (err) {

    console.error(err);

    return res.status(500).json({
      error: err.message,
    });

  }
};



// =====================================================
// EXPORT
// =====================================================

module.exports = {

  sendOTP,

  verifyOTP,

  loginUser,

};