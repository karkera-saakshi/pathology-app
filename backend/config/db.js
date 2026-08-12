// config/db.js
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

let userCollec; // This will hold your collection reference

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    
    const db = client.db(process.env.DB_NAME); // Use your DB name here
    // Assign the collection globally to the variable
    userCollec = db.collection("users"); 
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Stop the server if DB fails
  }
};

module.exports = {
  connectDB,
  getUserCollection: () => userCollec
};