const express = require("express");
const { registerUserController } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/register", registerUserController);

module.exports = { authRouter };
