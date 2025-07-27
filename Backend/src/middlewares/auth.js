const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
const { userModel } = require("../models/user");

const signJwtToken = (user) => {
  const { firstName, lastName, email, _id, role } = user;

  const token = jwt.sign(
    { firstName, lastName, email, _id, role },
    JWT_SECRET,
    { expiresIn: "1h" } // token will expire in one 1 hour
  );

  return token;
};

const verifyToken = async (req, res, next) => {
  const headers = req.headers;

  if (!headers) {
    return res.status(400).json({
      message: "No headers found!",
    });
  }

  const authorization = headers.authorization;

  const jwtToken = authorization.split(" ")[1];

  const userData = jwt.verify(jwtToken, JWT_SECRET);

  if (!userData) {
    return res.status(400).json({
      message: "Token is not validate",
    });
  }

  const isValidUser = await userModel.findById(userData._id);

  if (!isValidUser) {
    return res.status(400).json({
      message: "Not a valid user!",
    });
  }

  req.user = userData;
};

module.exports = { signJwtToken };
