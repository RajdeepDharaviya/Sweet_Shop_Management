const { userModel } = require("../models/user");

const registerUserController = async (req, res) => {
  const { _id, firstName, lastName, email, password, roleId } = req.body;

  const newUser = await userModel.create(req.body);

  res.status(201).json(newUser);
};

module.exports = { registerUserController };
