import axios from "axios";

export const getTodos = async (userid) => {
  const todos = await axios.get(`/api/todos/${userid}`);
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

export const editTodo = async ({ todoid, title }) => {
  try {
    const res = await axios({
      method: "put",
      url: `/api/todos/${todoid}`,
      data: {
        title,
      },
    });
    if (!res) throw new Error("Error in 'editTodo:DB'");
    return { success: true, todo: res.data };
  } catch (err) {
    console.log("Error in editing the todo:DB ", err);
    return { success: false, err };
  }
};

export const deleteTodo = async (todoid) => {
  try {
    const res = await axios({
      method: "delete",
      url: `/api/todos/${todoid}`,
    });
    if (!res.data) throw new Error("Error in 'deleteTodo:DB'");
    return { success: true, todo: res.data.todo };
  } catch (err) {
    console.log("Error in deleting the todo:DB ", err);
    return { success: false, err };
  }
};

export const createTask = async ({ user, todoid, task }) => {
  try {
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

export const editTask = async (taskid, todoid, task) => {
  try {
    console.log("eddiitttingggskkk ", task);
    const res = await axios({
      method: "put",
      url: `/api/todos/${todoid}/task/${taskid}`,
      data: task,
    });
    if (!res) throw new Error("Error in 'editTask:DB'");
    return { success: true, todo: res.data };
  } catch (err) {
    console.log("Error in editing the task:DB ", err);
    return { success: false, err };
  }
};

export const deleteTask = async (todoid, taskid) => {
  try {
    const res = await axios({
      method: "delete",
      url: `/api/todos/${todoid}/task/${taskid}`,
    });
    console.log("Deletee taskkkkkyyy", res.data);
    if (!res.data) throw new Error("Error in 'deleteTask:DB'");
    return { success: true, todo: res.data };
  } catch (err) {
    console.log("Error in deleting the task:DB ", err);
    return { success: false, err };
  }
};
