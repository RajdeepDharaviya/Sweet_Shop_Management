const { sweetModel } = require("../models/sweet");
const { userRoleModel } = require("../models/userRole");

const addSweetController = async (req, res) => {
  try {
    const { name, price, description, image, stock } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user has the right role to add a sweet

    const sweetData = await sweetModel.create({
      name,
      price,
      description,
      image,
      stock,
    });

    // Logic to add sweet to the database
    res.status(201).json(sweetData);
  } catch (error) {
    console.error("Error adding sweet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllSweetsController = async (req, res) => {
  try {
    const sweets = await sweetModel.find({});
    if (!sweets || sweets.length === 0) {
      return res.status(404).json({ message: "No sweets found" });
    }
    res.status(200).json(sweets);
  } catch (error) {
    console.error("Error fetching sweets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addSweetController,
  getAllSweetsController,
};
