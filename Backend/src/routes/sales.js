const express = require("express");
const { purchaseSweetController } = require("../controllers/sales");
const { verifyToken } = require("../middlewares/auth");

const salesRouter = express.Router();

salesRouter.use(verifyToken);

salesRouter.post("/sweets/:sweetId/purchase", purchaseSweetController);

module.exports = { salesRouter };
