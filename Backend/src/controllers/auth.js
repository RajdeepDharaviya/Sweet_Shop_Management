const { signJwtToken } = require("../middlewares/auth");
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

  // Checking if user exist or not in Database
  const isUserExist = await userModel.findOne({ email: email });

  // returning with 404 status if email is not found
  if (!isUserExist) {
    return res.status(404).json({
      message: "Email id is not found!",
    });
  }

  const user = await userModel
    .findOne({
      $and: [{ email: email }, { password: password }],
    })
    .populate("firstName lastName email roleId _id");

  if (!user) {
    return res.status(400).json({
      message: "Wrong password , Please try again!",
    });
  }

  const jwtToken = signJwtToken(user);

  res.status(200).json({
    user,
    jwtToken,
  });
};

module.exports = { registerUserController, loginUserController };
