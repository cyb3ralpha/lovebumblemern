const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Optional: Handle Mongoose connection events
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected! Attempting to reconnect...");
});

mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB reconnected successfully.");
});

module.exports = connectDB;
