const Todo = require("../models/todoModel");

exports.createTodo = async (req, res) => {
  try {
    const { title, tasks, user } = req.body;
    console.log("hooooyaaaa, ", req.body);
    if (!title || !user) {
      throw new Error("Todo title or User cannot be empty");
    }
    const todo = await Todo.create({
      title,
      tasks,
      user: user.id,
    });
    res.status(201).json(todo);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

exports.editTodoTitle = async (req, res) => {
  try {
    const { id, title, user } = req.body;
    const todo = await Todo.findById(id);
    if (user.id !== todo.user) {
      console.log("Accessing editTodoTitle From another token");
      throw new Error("Accessing editTodoTitle From another token");
    }
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
    const { user } = req.body;
    const todos = await Todo.find({ user: user.id });
    res.status(201).json(todos);
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};

exports.deleteTodos = async (req, res) => {
  try {
    const { todoid } = req.params;
    const { user } = req.body;
    const todo = await Todo.findById(todoid);
    if (todo.user !== user.id) {
      console.log("Error in deleting Todos");
      throw new Error("Error in deleting Todos");
    }
    // let todos = await Todo.find({ user: user.id });
    // let remainingTodo = todos?.filter((t) => t._id !== todoid);
    // todos = remainingTodo;
    // todos.save();
    const deletedTodo = await Todo.findByIdAndDelete(todoid);
    res.status(201).json({
      success: true,
      deletedTodo,
    });
  } catch (err) {
    console.log(err);
    res.status(401).send(err);
  }
};
