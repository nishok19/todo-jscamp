const express = require("express");
const { createTodo } = require("../controllers/todoControllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("bellloooo");
});

router.post("/todos", createTodo);

module.exports = router;
