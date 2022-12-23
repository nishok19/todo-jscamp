import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import TodoLists from "./Components/TodoLists.component";
import Topbar from "./Components/Topbar.component";
import { account } from "./utils/appwrite.config";
import useTodoStore from "./store/store";

import { logout } from "./utils/auth";
import { getTodos } from "./utils/db";
import { sortAscTodoList } from "./utils/helper";

function App() {
  const navigate = useNavigate();
  const addAllTodos = useTodoStore((state) => state.addAllTodos);
  const setUser = useTodoStore((state) => state.setUser);
  const clearAll = useTodoStore((state) => state.clearAll);
  const storetodos = useTodoStore((state) => state.todos);
  const storeuser = useTodoStore((state) => state.user);
  const storeSearchedTodos = useTodoStore((state) => state.searchedTodos);
  const storeRemoveSearchedTodos = useTodoStore(
    (state) => state.removeSearchedTodos
  );
  // const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res) => {
        console.log("userrrrr", res);
        setUser(res);
        fetchTodos(res);

        console.log("stooooreee", storetodos);
      },
      (err) => console.log("Error is getting user data", err)
    );
  }, []);

  // useEffect(() => {
  //   addAllTodos(storetodos);
  // }, [storetodos]);

  const fetchTodos = async (user) => {
    const todos = await getTodos(user.$id);
    console.log("untodos", todos);
    const sortedTodos = sortAscTodoList(todos);
    addAllTodos(sortedTodos);
    // return todos;
  };

  const handleLogout = async () => {
    const isLogout = await logout();
    if (isLogout.success) {
      clearAll();
      console.log("Logged Out successfully");
    }
    console.log("Error in Logged Out");
    navigate("/login");
  };

  return (
    <>
      <div className="bg-bgdark text-white min-h-screen">
        <img
          src="./assets/logo.png"
          alt="logo"
          className="w-[150px] h-[150px] ml-[10em]"
        />
        {storeuser ? (
          <section className="mx-[200px]">
            <div className="flex justify-between mb-3">
              <span>Hi, {storeuser?.name}</span>
              <button
                className="btn btn-outline btn-error"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            <Topbar />
            {storeSearchedTodos.isSearched ? (
              <>
                <div className="flex justify-end mt-5">
                  <button className="btn " onClick={storeRemoveSearchedTodos}>
                    Clear Search
                  </button>
                </div>
                <TodoLists todos={storeSearchedTodos.searchTodos} />
              </>
            ) : (
              <TodoLists todos={storetodos} />
            )}
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
