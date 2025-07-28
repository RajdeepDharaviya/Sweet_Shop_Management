const express = require("express");
const { authRouter } = require("./routes/auth");
const { sweetRouter } = require("./routes/sweet");
const { salesRouter } = require("./routes/sales");
const cors = require("cors");
const { connectDB } = require("./config/database");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust the origin as needed
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api", sweetRouter);
app.use("/api", salesRouter);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

module.exports = app;
