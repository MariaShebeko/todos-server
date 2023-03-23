const express = require("express");
const moment = require("moment/moment");
const logger = require("morgan");
const fs = require("fs/promises");
const cors = require("cors");

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

// Middleware to show request and time
// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format("DD-MM-YYYY_hh:mm:ss");
//   await fs.appendFile("server.log", `\n${method} ${url} ${date}`);
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ status: err.status, message: err.message });
});

app.listen(3001, () => console.log("Server running"));
