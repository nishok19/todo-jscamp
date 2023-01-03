import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import TodoLists from "./Components/TodoLists.component";
import Topbar from "./Components/Topbar.component";
import useTodoStore from "./store/store";

import { logout } from "./utils/auth";
import { getTodos } from "./utils/db";
import { sortAscTodoList } from "./utils/helper";

function App() {
  const navigate = useNavigate();
  const addAllTodos = useTodoStore((state) => state.addAllTodos);
  const storeSetUser = useTodoStore((state) => state.setUser);
  const clearAll = useTodoStore((state) => state.clearAll);
  const storetodos = useTodoStore((state) => state.todos);
  const storeuser = useTodoStore((state) => state.user);
  const storeToken = useTodoStore((state) => state.jwt);
  const storeSearchedTodos = useTodoStore((state) => state.searchedTodos);
  const storeRemoveSearchedTodos = useTodoStore(
    (state) => state.removeSearchedTodos
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, status } = await getTodos(storeToken);
    if (status === 401) {
      console.log("Session expired or user logged out");
      navigate("/login");
      return null;
    }
    const sortedTodos = sortAscTodoList(data.todos);
    storeSetUser({ user: data.user, jwt: data.jwt });
    addAllTodos(sortedTodos);
    console.log("third", storeuser, storetodos);
  };

  const handleLogout = async () => {
    const res = await logout();
    console.log("logggginnngggggggggg out", res);

    clearAll();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-bgdark text-white min-h-screen">
        {console.log("second", storeuser)}
        {Object.keys(storeuser).length !== 0 && storeToken ? (
          <section className="mx-[200px]">
            <img
              src="./assets/logo.png"
              alt="logo"
              className="w-[150px] h-[150px] ml-[10em]"
            />
            <div className="flex justify-between mb-3">
              <span>Hi, {storeuser?.username}</span>
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
