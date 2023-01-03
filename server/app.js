require("dotenv").config();
require("./config/database")();
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

app.use("/", todoRoutes);

module.exports = app;
