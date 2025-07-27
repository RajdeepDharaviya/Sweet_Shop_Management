const express = require("express");
const {
  addSweetController,
  getAllSweetsController,
} = require("../controllers/sweet");
const { get } = require("mongoose");
const sweetRouter = express.Router();

sweetRouter.post("/sweet", addSweetController);
sweetRouter.get("/sweets", getAllSweetsController);

module.exports = { sweetRouter };
