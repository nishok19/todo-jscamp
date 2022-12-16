const mongoose = require("mongoose");
// var id = mongoose.Types.ObjectId();

const tasks = new mongoose.Schema(
  {
    task: {
      type: String,
    },
    status: {
      type: String,
      enum: ["NOT COMPLETED", "COMPLETED", "PENDING"],
      default: "NOT COMPLETED",
    },
  },
  {
    timestamps: true,
  }
);

const todos = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    tasks: {
      type: [tasks],
      default: [],
    },
    user: {
      type: String,
      required: [true, "User is required to create a Todo"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", todos);
