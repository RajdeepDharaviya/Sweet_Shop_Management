const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    sweetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sweet",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const salesModel = mongoose.model("sales", salesSchema);

module.exports = { salesModel };
