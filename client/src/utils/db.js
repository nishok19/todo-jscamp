import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

axios.defaults.withCredentials = true;

export const getTodos = async (token = "") => {
  const todos = await axios({
    method: "get",
    url: `${baseUrl}/api/todos`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return todos;
};

export const createTodo = async (todo, token) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseUrl}/api/todos`,
      headers: { Authorization: `Bearer ${token}` },
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

export const editTodo = async (todoid, title, token) => {
  try {
    const res = await axios({
      method: "put",
      url: `${baseUrl}/api/todos/${todoid}`,
      headers: { Authorization: `Bearer ${token}` },
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

export const deleteTodo = async (todoid, token) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${baseUrl}/api/todos/${todoid}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.data) throw new Error("Error in 'deleteTodo:DB'");
    return { success: true, todo: res.data.todo };
  } catch (err) {
    console.log("Error in deleting the todo:DB ", err);
    return { success: false, err };
  }
};

export const createTask = async ({ user, todoid, task, token }) => {
  try {
    const res = await axios({
      method: "post",
      url: `${baseUrl}/api/todos/${todoid}/task`,
      headers: { Authorization: `Bearer ${token}` },

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

export const editTask = async (taskid, todoid, task, token) => {
  try {
    console.log("eddiitttingggskkk ", task);
    const res = await axios({
      method: "put",
      url: `${baseUrl}/api/todos/${todoid}/task/${taskid}`,
      headers: { Authorization: `Bearer ${token}` },

      data: task,
    });
    if (!res) throw new Error("Error in 'editTask:DB'");
    return { success: true, todo: res.data };
  } catch (err) {
    console.log("Error in editing the task:DB ", err);
    return { success: false, err };
  }
};

export const deleteTask = async (todoid, taskid, token) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${baseUrl}/api/todos/${todoid}/task/${taskid}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Deletee taskkkkkyyy", res.data);
    if (!res.data) throw new Error("Error in 'deleteTask:DB'");
    return { success: true, todo: res.data };
  } catch (err) {
    console.log("Error in deleting the task:DB ", err);
    return { success: false, err };
  }
};
