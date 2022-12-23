const express = require("express");
const {
  createTask,
  editTask,
  // editTaskTitle,
  deleteTask,
} = require("../controllers/taskControllers");
const {
  createTodo,
  getAllTodos,
  editTodoTitle,
  deleteTodos,
} = require("../controllers/todoControllers");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("bellloooo");
});

router.post("/api/todos", createTodo);
router.get("/api/todos/:userid", getAllTodos);
router.put("/api/todos/:todoid", editTodoTitle);
router.delete("/api/todos/:todoid", deleteTodos);

router.post("/api/todos/:id/task", createTask);
router.put("/api/todos/:todoid/task/:taskid", editTask);
// router.post("/api/todos/:todoid/task/:taskid", editTaskTitle);
router.delete("/api/todos/:todoid/task/:taskid", deleteTask);

// router.post("/api/todos/")

module.exports = router;
