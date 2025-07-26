const express = require("express");
const { authRouter } = require("./routes/auth");
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

module.exports = app;
