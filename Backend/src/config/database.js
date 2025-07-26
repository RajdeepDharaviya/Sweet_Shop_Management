const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("");
  } catch (err) {
    console.log("Error : ", err.message);
  }
};

module.exports = { connectDB };
