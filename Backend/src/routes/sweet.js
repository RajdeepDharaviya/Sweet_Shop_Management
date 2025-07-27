const express = require("express");
const {
  addSweetController,
  getAllSweetsController,
  getSweetBySearchController,
} = require("../controllers/sweet");
const sweetRouter = express.Router();

sweetRouter.post("/sweet", addSweetController);
sweetRouter.get("/sweets", getAllSweetsController);
sweetRouter.get("/sweets/search", getSweetBySearchController);

module.exports = { sweetRouter };
