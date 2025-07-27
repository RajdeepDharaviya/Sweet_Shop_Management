const express = require("express");
const {
  addSweetController,
  getAllSweetsController,
  getSweetBySearchController,
  updateSweetController,
} = require("../controllers/sweet");
const sweetRouter = express.Router();

sweetRouter.post("/sweet", addSweetController);
sweetRouter.get("/sweets", getAllSweetsController);
sweetRouter.get("/sweets/search", getSweetBySearchController);
sweetRouter.put("/sweets/:id", updateSweetController);

module.exports = { sweetRouter };
