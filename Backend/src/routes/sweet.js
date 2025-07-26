const express = require("express");
const { addSweetController } = require("../controllers/sweet");
const sweetRouter = express.Router();

sweetRouter.post("/", addSweetController);

module.exports = { sweetRouter };
