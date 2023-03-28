const mongoose = require("mongoose");
const app = require("../index");

const { DB_HOST, PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => console.log("Server running"));
  })
  .catch((err) => {
    console.log(err);
    process.exit(1); // to close all unused processes
  });
