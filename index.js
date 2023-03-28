const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const todosRouter = require("./routes/api/todos");

const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short";

// Middleware which output info about reauests
app.use(logger(formatLogger));
// Middleware to allow CORS, should be configurated
app.use(cors());
// To point in which format we expect data (request body) to make ability to read this info
app.use(express.json());

app.use("/api/todos", todosRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ status: err.status, message: err.message });
});

module.exports = app;
