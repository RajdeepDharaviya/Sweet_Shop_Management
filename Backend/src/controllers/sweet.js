const { sweetModel } = require("../models/sweet");
const { userRoleModel } = require("../models/userRole");

const addSweetController = async (req, res) => {
  try {
    const { name, price, description, image, stock, category } = req.body;
    if (!name || !price || !description || !image || !stock || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user has the right role to add a sweet

    const sweetData = await sweetModel.create({
      name,
      price,
      description,
      image,
      category,
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

const getSweetBySearchController = async (req, res) => {
  try {
    const { term } = req.query;
    console.log("Search term:", term);

    if (!term) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // implementing search logic
    // Search by name, category, or price range
    // If term is a string, search by name or category
    if (isNaN(term)) {
      // If term is not a number, search by name or category
      const searchConditions = [
        { name: { $regex: term, $options: "i" } },
        { category: { $regex: term, $options: "i" } },
      ];
      const sweets = await sweetModel.find({ $or: searchConditions });
      if (!sweets || sweets.length === 0) {
        return res.status(404).json({ message: "No sweets found" });
      }
      return res.status(200).json(sweets);
    }

    // If term is a number, search by price
    const price = parseFloat(term);
    console.log("Searching sweets with price less than or equal to:", price);

    const sweets = await sweetModel.find({ price: { $lte: price } });
    console.log("Sweets found:", sweets);

    if (!sweets || sweets.length === 0) {
      return res.status(404).json({ message: "No sweets found" });
    }
    res.status(200).json(sweets);
  } catch (error) {
    console.error("Error searching sweets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addSweetController,
  getAllSweetsController,
  getSweetBySearchController,
};
