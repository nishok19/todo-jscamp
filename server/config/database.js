const { DB_URL } = require("./env.config");
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to the database"))
    .catch((err) => console.log("Error connecting to the database, ", err));
};
module.exports = connect;
