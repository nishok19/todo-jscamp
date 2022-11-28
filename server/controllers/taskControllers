const Todo = require("../models/todoModel");

exports.createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    if (!id || !task)
      throw new Error("Id and Task cannot be empty in while creating a task");

    const todo = await Todo.findById(id);
    todo.tasks.push({ task });
    await todo.save();

    res.status(201).json(todo);
  } catch (err) {
    console.log("Error in creating a task... ", err);
    res.status(401).send(err);
  }
};

exports.editTaskStatus = async (req, res) => {
  try {
    const { todoid, taskid } = req.params;
    const { status } = req.body;

    if (!todoid || !taskid || !status)
      throw new Error(
        "TodoId or TaskId or status cannot be empty in while editing a task status"
      );

    const todo = await Todo.findById(todoid);
    todo.tasks.filter((task) => {
      if (task._id == taskid) {
        task.status = status;
      }
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (err) {
    console.log("Error while editing a task status... " + err);
    res.status(401).send(err);
  }
};

exports.editTaskTitle = async (req, res) => {
  try {
    const { todoid, taskid } = req.params;
    const { task } = req.body;

    if (!todoid || !taskid || !task)
      throw new Error(
        "TodoId or TaskId or task cannot be empty in while editing a task title"
      );

    const todo = await Todo.findById(todoid);
    todo.tasks.filter((tsk) => {
      if (tsk._id == taskid) {
        tsk.task = task;
      }
    });

    await todo.save();

    res.status(201).json(todo);
  } catch (err) {
    console.log("Error while editing a task title... " + err);
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
