export const sortAscTodoList = (todos) => {
  let sortedTodos = todos.map((todo) => {
    todo.tasks.sort((task1, task2) => {
      return new Date(task1.createdAt) - new Date(task2.createdAt);
    });
    return todo;
  });
  return sortedTodos;
};

export const sortDscTodoList = (todos) => {
  let sortedTodos = todos.map((todo) => {
    todo.tasks.sort((task1, task2) => {
      return new Date(task2.createdAt) - new Date(task1.createdAt);
    });
    return todo;
  });
  return sortedTodos;
};

export const searchTodo = (todos, text) => {
  const selTodo = todos.filter((todo) => {
    var regex = new RegExp(text, "i");
    console.log("qqqqqq", todo);
    const something =
      todo?.title.match(regex) ||
      todo.tasks.filter((c) => {
        console.log("ccccccc", c?.task.match(regex));
        return c?.task.match(regex);
      });
    console.log("csomething", something);

    return (something && something.length) !== 0 ? something : null;
  });

  //
  console.log("selected Todos....", selTodo);
  return selTodo;
};
