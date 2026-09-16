const crypto = require("crypto");

const {
  getOtpCollection,
} = require("../config/db");

const hashOTP = (otp) => {
  return crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");
};

const saveOTP = async (
  email,
  otp,
  passwordHash,
  role
) => {
  const col = getOtpCollection();

  const normalizedEmail =
    email.toLowerCase().trim();

  await col.deleteMany({
    email: normalizedEmail,
  });

  await col.insertOne({
    email: normalizedEmail,
    otpHash: hashOTP(otp),
    passwordHash: passwordHash,
    role: role,
    attempts: 0,
    createdAt: new Date(),
  });
};

const getOTP = async (email) => {
  const col = getOtpCollection();

  return await col.findOne({
    email: email.toLowerCase().trim(),
  });
};

const deleteOTP = async (email) => {
  const col = getOtpCollection();

  await col.deleteMany({
    email: email.toLowerCase().trim(),
  });
};

const verifyOTPHash = (
  enteredOTP,
  storedOTPHash
) => {
  const enteredHash = hashOTP(enteredOTP);

  return enteredHash === storedOTPHash;
};

module.exports = {
  saveOTP,
  getOTP,
  deleteOTP,
  verifyOTPHash,
};