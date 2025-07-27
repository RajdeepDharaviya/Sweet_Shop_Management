const { default: mongoose } = require("mongoose");
const { salesModel } = require("../models/sales");
const { ObjectId } = require("mongodb");
const { sweetModel } = require("../models/sweet");

const purchaseSweetController = async (req, res) => {
  try {
    const { sweetId } = req.params;
    // Logic to handle the purchase of a sweet by its ID

    if (!sweetId) {
      return res.status(400).json({ message: "Sweet ID is required." });
    }

    // ✅ Validate ID format first
    if (!mongoose.Types.ObjectId.isValid(sweetId)) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    const sale = await salesModel.create({
      sweetId,
      customerId: new ObjectId("000000000000000000000000"), // Replace with actual user ID from request context
      quantity: req.body.quantity,
      totalPrice: 200,
    });

    if (!sale) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    // updating the stock of the sweet
    const updateStock = await sweetModel.findByIdAndUpdate(
      sweetId,
      { $inc: { stock: -req.body.quantity } },
      { new: true }
    );

    if (!updateStock) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({
      message: `Sweet with ID ${sweetId} purchased successfully.`,
      sweet: {
        name: updateStock.name,
        stock: updateStock.stock,
      },
    });
  } catch (error) {
    console.error("Error purchasing sweet:", error);
    res.status(500).json({ message: "Failed to purchase sweet." });
  }
};

module.exports = { purchaseSweetController };
