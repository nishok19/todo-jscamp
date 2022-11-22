const { URL } = process.env;
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to the database"))
    .catch((err) => console.log("Error connecting to the database, ", err));
};
module.exports = connect;
