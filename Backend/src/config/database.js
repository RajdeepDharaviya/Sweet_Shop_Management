const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sweet_shop");
  } catch (err) {
    console.log("Error : ", err.message);
  }
};

module.exports = { connectDB };
