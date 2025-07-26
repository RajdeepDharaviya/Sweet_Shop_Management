const express = require("express");
const { authRouter } = require("./routes/auth");
const { sweetRouter } = require("./routes/sweet");
const { addSweetController } = require("./controllers/sweet");
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/sweet", sweetRouter);

module.exports = app;
