import axios from "axios";

export const getTodos = async () => {
  const todos = await axios.get("/api/todos");
  return todos.data;
};

export const createTodo = async (todo) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/todos",
      data: {
        title: todo.todo,
        user: todo.user,
      },
    });
    if (!res) throw new Error("Error in 'createTodo'");
    return { success: true, todo: res.data };
  } catch (err) {
    console.log("Error in creating the todo ", err);
    return { success: false, err };
  }
};

export const createTask = async ({ user, todoid, task }) => {
  try {
    console.log("ssurrr...", { user, todoid, task });
    const res = await axios({
      method: "post",
      url: `/api/todos/${todoid}/task`,
      data: {
        task: task,
        user,
      },
    });
    if (!res) throw new Error("Error in 'createTask:DB'");
    return { success: true, todo: res.data };
  } catch (err) {
    console.log("Error in creating the task:DB ", err);
    return { success: false, err };
  }
};
