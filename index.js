const express = require("express");
const app = express();
require("dotenv").config();
var logger = require("morgan");

const PORT = 4001;

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
const ordersSheetRouter = require("./routes/orders");

app.use("/orders", ordersSheetRouter);

app.listen(PORT, () =>
  console.log(`Server Running on Port: http://localhost:${PORT}`)
);
