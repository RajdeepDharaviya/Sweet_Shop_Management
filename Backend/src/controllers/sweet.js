const { sweetModel } = require("../models/sweet");

const addSweetController = async (req, res) => {
  const { name, price, description, image, stock } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sweetData = await sweetModel.create({
    name,
    price,
    description,
    image,
    stock,
  });
  // Logic to add sweet to the database
  res.status(201).json({ name, price, description, image, stock });
};

module.exports = {
  addSweetController,
};
