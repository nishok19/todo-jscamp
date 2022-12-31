const Todo = require("../models/todoModel");

exports.createTask = async (req, res) => {
  try {
    const { todoid } = req.params;
    const { task } = req.body;

    if (!todoid || !task)
      throw new Error(
        "TodoId and Task cannot be empty in while creating a task"
      );

    const todo = await Todo.findById(todoid);
    todo.tasks.push({ task });
    await todo.save();

    res.status(201).json(todo);
  } catch (err) {
    console.log("Error in creating a task... ", err);
    res.status(401).send(err);
  }
};

exports.editTask = async (req, res) => {
  try {
    const { todoid, taskid } = req.params;
    const { task, status } = req.body;
    console.log("reqwqqqq", req.body, !todoid || !taskid || !task);
    if (!todoid || !taskid || (!task && !status))
      throw new Error(
        "TodoId or TaskId or status cannot be empty in while editing a task status"
      );

    const todo = await Todo.findById(todoid);
    todo.tasks.filter((t) => {
      if (t._id == taskid) {
        task ? (t.task = task) : null;
        status ? (t.status = status) : null;
      }
    });

    await todo.save({ validateBeforeSave: false });

    res.status(201).json(todo);
  } catch (err) {
    console.log("Error while editing a task ... " + err);
    res.status(401).send(err);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { todoid, taskid } = req.params;

    if (!todoid || !taskid)
      throw new Error(
        "TodoId or TaskId cannot be empty in while Deleting a task"
      );

    const todo = await Todo.findById(todoid);
    const filteredTasks = todo.tasks.filter((tsk) => tsk.id !== taskid);
    todo.tasks = filteredTasks;
    todo.save();

    res.status(201).json(todo);
  } catch (err) {
    console.log("Error while Deleting a task... " + err);
    res.status(401).send(err);
  }
};
