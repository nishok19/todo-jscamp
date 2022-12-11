import { useEffect, useState } from "react";
import "./App.css";
import TodoLists from "./Components/TodoLists.component";
import Topbar from "./Components/Topbar.component";

import { getTodos } from "./utils/db";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  });

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  return (
    <div className="bg-bgdark text-white min-h-screen">
      <section className="py-[100px] mx-[200px]">
        <Topbar />
        <TodoLists todos={todos} />
      </section>
    </div>
  );
}

export default App;
