const addSweetController = (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Logic to add sweet to the database
  res.status(201).json({ name, price, description });
};

module.exports = {
  addSweetController,
};
