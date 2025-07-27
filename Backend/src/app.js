const express = require("express");
const { authRouter } = require("./routes/auth");
const { sweetRouter } = require("./routes/sweet");
const { salesRouter } = require("./routes/sales");
const { addSweetController } = require("./controllers/sweet");
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", sweetRouter);
app.use("/api", salesRouter);

module.exports = app;
