const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;

const client = new MongoClient(url);

let userCollec;
let otpCollec;

const connectDB = async () => {
  try {
    await client.connect();

    console.log("Connected successfully to MongoDB");

    const db = client.db(process.env.DB_NAME);

    userCollec = db.collection("users");
    otpCollec = db.collection("otps");

    console.log("Users collection ready");
    console.log("OTPs collection ready");

  } catch (error) {
    console.error(
      "Database connection failed:",
      error
    );

    process.exit(1);
  }
};

const getUserCollection = () => {
  return userCollec;
};

const getOtpCollection = () => {
  return otpCollec;
};

module.exports = {
  connectDB,
  getUserCollection,
  getOtpCollection,
};