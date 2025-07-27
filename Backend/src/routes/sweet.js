const express = require("express");
const {
  addSweetController,
  getAllSweetsController,
  getSweetBySearchController,
  updateSweetController,
  deleteSweetController,
} = require("../controllers/sweet");
const sweetRouter = express.Router();

sweetRouter.post("/sweet", addSweetController);
sweetRouter.get("/sweets", getAllSweetsController);
sweetRouter.get("/sweets/search", getSweetBySearchController);
sweetRouter.put("/sweets/:id", updateSweetController);
sweetRouter.delete("/sweets/:id", deleteSweetController);

module.exports = { sweetRouter };
