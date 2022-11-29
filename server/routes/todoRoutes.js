const express = require("express");
const {
  createTask,
  editTaskStatus,
  editTaskTitle,
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
router.get("/api/todos", getAllTodos);
router.put("/api/todos", editTodoTitle);
router.delete("/todos", deleteTodos);

router.post("/api/todos/:id/task", createTask);
router.put("/api/todos/:todoid/task/:taskid", editTaskStatus);
router.post("/api/todos/:todoid/task/:taskid", editTaskTitle);
router.delete("/api/todos/:todoid/task/:taskid", deleteTask);

module.exports = router;