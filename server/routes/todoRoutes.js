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
const {
  loginController,
  signupController,
} = require("../controllers/authControllers");

const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("bellloooo");
});

// Authentication
router.post("/auth/login", loginController);
router.post("/auth/signup", signupController);

router.post("/api/todos", auth, createTodo);
router.get("/api/todos", auth, getAllTodos);
router.put("/api/todos", auth, editTodoTitle);
router.delete("/api/todos/:todoid", auth, deleteTodos);

router.post("/api/todos/:id/task", auth, createTask);
router.put("/api/todos/:todoid/task/:taskid", auth, editTaskStatus);
router.post("/api/todos/:todoid/task/:taskid", auth, editTaskTitle);
router.delete("/api/todos/:todoid/task/:taskid", auth, deleteTask);

module.exports = router;
