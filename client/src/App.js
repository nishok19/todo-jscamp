import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import TodoLists from "./Components/TodoLists.component";
import Topbar from "./Components/Topbar.component";
import { account } from "./utils/appwrite.config";
import useTodoStore from "./Components/store/store";

import { logout } from "./utils/auth";
import { getTodos } from "./utils/db";

function App() {
  const navigate = useNavigate();
  const addAllTodos = useTodoStore((state) => state.addAllTodos);
  const setUser = useTodoStore((state) => state.setUser);
  const storetodos = useTodoStore((state) => state.todos);
  const storeuser = useTodoStore((state) => state.user);
  // const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res) => {
        console.log("userrrrr", res);
        setUser(res);
        fetchTodos();

        console.log("stooooreee", storetodos);
      },
      (err) => console.log("Error is getting user data", err)
    );
  }, []);

  useEffect(() => {
    addAllTodos(storetodos);
  }, [storetodos]);

  const fetchTodos = async () => {
    const todos = await getTodos();

    addAllTodos(todos);

    // return todos;
  };

  const handleLogout = async () => {
    const isLogout = await logout();
    if (isLogout.success) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="bg-bgdark text-white min-h-screen">
        {storeuser ? (
          <section className="py-[100px] mx-[200px]">
            <button
              className="btn btn-outline btn-error"
              onClick={handleLogout}
            >
              Logout
            </button>
            <Topbar />
            <TodoLists todos={storetodos} />
          </section>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-screen	">
            <h4>Please login to access your todos</h4>
            <Link to="/login" className="mt-4">
              <button className="btn btn-error" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
