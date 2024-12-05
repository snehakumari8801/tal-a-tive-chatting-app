const mongoose = require("mongoose");

const connectedDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://sneha:sneha123@cluster0.3izklsq.mongodb.net/chatApp",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message || error);
    process.exit();
  }
};

module.exports = connectedDB;
