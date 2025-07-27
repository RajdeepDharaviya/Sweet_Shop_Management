const express = require("express");
const { purchaseSweetController } = require("../controllers/sales");

const salesRouter = express.Router();

salesRouter.post("/sweets/:sweetId/purchase", purchaseSweetController);

module.exports = { salesRouter };
