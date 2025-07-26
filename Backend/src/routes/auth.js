const express = require("express");
const { registerUser } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", registerUser);

module.exports = { authRouter };
