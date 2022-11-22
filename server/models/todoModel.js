const mongoose = require("mongoose");
// var id = mongoose.Types.ObjectId();

const tasks = new mongoose.Schema({
  task: {
    type: String,
  },
});

const todos = new mongoose.Schema({
  name: {
    type: String,
  },
  tasks: {
    type: [tasks],
    default: [],
  },
});

module.exports = mongoose.model("todo", todos);
