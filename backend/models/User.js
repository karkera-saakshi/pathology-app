const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { getUserCollection } = require("../config/db");
// Note: Ensure userCollec is accessible/imported here
const registerUser = (userData) => {
  const { email, password } = userData;
  const col = getUserCollection();
  return col.findOne({ email })
    .then((userExists) => {
      if (userExists) {
        // Reject the promise with a 400 status if user exists
        return { success: false, message: "User already exists" };
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      return col.insertOne({ ...userData, password: hashedPassword });
    });
};

const loginUser = (credentials) => {
  const { email, password , role } = credentials;
  const col = getUserCollection();
  return col.findOne({ email })
    .then((user) => {
      // 1. Check if user exists and password is correct
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return { success: false, message: "Invalid email or password" };
      }

      // 2. Check if the role matches
      if (user.role !== role) {
        return { success: false, message: "Access denied: Incorrect role selected" };
      }

      return { success: true, user };
    });
};

module.exports = { registerUser, loginUser };