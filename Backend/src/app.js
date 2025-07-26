const express = require("express");
const { authRouter } = require("./routes/auth");
const app = express();
app.use(express.json());

console.log("This : ", typeof authRouter);

app.use("/api/auth", authRouter);

module.exports = app;
