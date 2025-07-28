const express = require("express");
const {
  addSweetController,
  getAllSweetsController,
  getSweetBySearchController,
  updateSweetController,
  deleteSweetController,
  restockSweetController,
} = require("../controllers/sweet");
const { verifyToken } = require("../middlewares/auth");
const sweetRouter = express.Router();

sweetRouter.get("/sweets", getAllSweetsController);
sweetRouter.get("/sweets/search", getSweetBySearchController);
sweetRouter.use(verifyToken);
sweetRouter.post("/sweet", addSweetController);
sweetRouter.put("/sweets/:id", updateSweetController);
sweetRouter.delete("/sweets/:id", deleteSweetController);
sweetRouter.put("/sweets/:id/restock", restockSweetController);

module.exports = { sweetRouter };
