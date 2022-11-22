const Todo = require("../models/todoModel");

exports.createTodo = async (req, res) => {
  const { name, tasks } = req.body;
  const todo = await Todo.create({
    name,
    tasks,
  });
  res.json(todo);
};
