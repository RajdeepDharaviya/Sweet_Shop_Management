const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const sweetModel = mongoose.model("sweets", sweetSchema);

module.exports = { sweetModel };
