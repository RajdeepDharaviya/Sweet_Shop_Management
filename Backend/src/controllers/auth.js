const { signJwtToken } = require("../middlewares/auth");
const { userModel } = require("../models/user");

const registerUserController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Checking if all fields are provided
    if (!firstName || !lastName || !email || !password || role === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking if user exist or not in Database
    const isUserExist = await userModel.findOne({ email: email });

    // returning with 404 status if email is not found
    if (!isUserExist) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = await userModel
      .findOne({
        $and: [{ email: email }, { password: password }],
      })
      .populate("firstName lastName email role _id");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const jwtToken = signJwtToken(user);

    res.status(200).json({
      user,
      jwtToken,
    });
  } catch (err) {
    res.status(401).json({
      message: "An error occurred during login",
    });
  }
};

module.exports = { registerUserController, loginUserController };
