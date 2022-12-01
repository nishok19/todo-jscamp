const Todo = require("../models/todoModel");

exports.todoauthorization = async (req, res, next) => {
  try {
    const { todoid } = req.params;
    const userid = req.body.user.id;
    console.log("oooyaaa", req.body);
    console.log("oooyyeeee", req.params);

    const todo = await Todo.findById(todoid);
    if (!todoid || !userid || !todo) {
      throw new Error("Err in todoauth, todoid and userid are needed");
    }
    if (todo.user !== userid) {
      throw new Error(
        "Err in todoauth, todoid and userid are different...Illegal access"
      );
    }
    next();
  } catch (err) {
    console.log(
      "Error in todo authorization, todoid is not associated with userid...",
      err
    );
    res.status(401).json(err);
  }
};
