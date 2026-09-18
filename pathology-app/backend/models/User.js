const bcrypt = require("bcryptjs");

const { getUserCollection } = require("../config/db");


// Find user by email
const findUserByEmail = async (email) => {
  const col = getUserCollection();

  return await col.findOne({ email });
};


// Register user
const registerUser = async (userData) => {
  const { email, passwordHash, role } = userData;

  const col = getUserCollection();

  const userExists = await col.findOne({ email });

  if (userExists) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  // Password is already hashed
  const result = await col.insertOne({
    email,
    password: passwordHash,
    role,
    createdAt: new Date(),
  });

  return result;
};

// Login user
const loginUser = async (credentials) => {
  const { email, password, role } = credentials;

  const col = getUserCollection();

  const user = await col.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  if (user.role !== role) {
    return {
      success: false,
      message: "Access denied: Incorrect role selected",
    };
  }

  return {
    success: true,
    user,
  };
};


module.exports = {
  findUserByEmail,
  registerUser,
  loginUser,
};