const express = require("express");
const authController = require("../controllers/authController");
let router = express.Router();
router.post("/signup",authController.registerUser);
router.post("/login",authController.loginUser);
module.exports = router;
