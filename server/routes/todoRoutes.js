const express = require("express");
const {
  createTask,
  editTask,
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
  logoutController,
} = require("../controllers/authControllers");

const router = express.Router();
const auth = require("../middleware/auth");
const { todoauthorization } = require("../middleware/todoauthorization");

router.get("/", (req, res) => {
  res.send("bellloooo");
});

// Authentication
router.post("/api/auth/login", loginController);
router.post("/api/auth/signup", signupController);
router.get("/api/auth/logout", logoutController);

router.get("/api/todos/", auth, getAllTodos);
router.post("/api/todos", auth, createTodo);
router.put("/api/todos/:todoid", auth, todoauthorization, editTodoTitle);
router.delete("/api/todos/:todoid", auth, todoauthorization, deleteTodos);

router.post("/api/todos/:todoid/task", auth, todoauthorization, createTask);
router.put(
  "/api/todos/:todoid/task/:taskid",
  auth,
  todoauthorization,
  editTask
);
router.delete(
  "/api/todos/:todoid/task/:taskid",
  auth,
  todoauthorization,
  deleteTask
);

module.exports = router;
