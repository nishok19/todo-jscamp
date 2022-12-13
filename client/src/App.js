import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import TodoLists from "./Components/TodoLists.component";
import Topbar from "./Components/Topbar.component";
import { account } from "./utils/appwrite.config";

import { logout } from "./utils/auth";
import { getTodos } from "./utils/db";

function App() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const getData = account.get();
    getData.then(
      (res) => {
        console.log("userrrrr", res);
        setUserDetails(res);
        fetchTodos();
      },
      (err) => console.log("Error is getting user data", err)
    );
  }, []);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
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
        {userDetails ? (
          <section className="py-[100px] mx-[200px]">
            <button
              className="btn btn-outline btn-error"
              onClick={handleLogout}
            >
              Logout
            </button>
            <Topbar />
            <TodoLists todos={todos} />
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
