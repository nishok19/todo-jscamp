const Todo = require("../models/todoModel");

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks, user } = req.body;
    console.log("CreateTodo ", req.body);
    if (title == "" || !user) {
      throw new Error("Todo title and user ID cannot be empty");
    }
    const todo = await Todo.create({
      title,
      tasks,
      user,
    });
    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

exports.editTodoTitle = async (req, res) => {
  try {
    const { id, title } = req.body;
    const todo = await Todo.findById(id);
    todo.title = title;
    todo.save();
    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(201).json(todos);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

exports.deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    res.status(201).json({
      success: true,
      todo,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};
