require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");

let app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

const startServer = async () => {
  try {
    await connectDB(); 

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => console.log(`I am listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start the server:", err);
  }
};

startServer();