const { userModel } = require("../models/user");

const registerUserController = async (req, res) => {
  const { firstName, lastName, email, password, roleId } = req.body;

  const newUser = await userModel.create({
    firstName,
    lastName,
    email,
    password,
    roleId,
  });

  res.status(201).json(newUser);
};

const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({
    _id: Date.now(),
    email,
  });
};

module.exports = { registerUserController, loginUserController };
