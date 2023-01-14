require("dotenv").config();
require("./config/database")();
const express = require("express");
const app = express();
const todoRoutes = require("./routes/todoRoutes");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(allowCrossDomain);

app.use(cookieParser());

const corsOptions = {
  credentials: true,
  origin: true,
};
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use("/", todoRoutes);

module.exports = app;
