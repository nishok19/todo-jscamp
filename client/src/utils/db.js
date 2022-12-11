import axios from "axios";

export const getTodos = async () => {
  const todos = await axios.get("/api/todos");
  return todos.data;
};
