import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTodoStore from "../store/store";
import { login } from "../utils/auth";
import Toast from "./Toast.component";

const Login = () => {
  const navigate = useNavigate();

  const setStoreUser = useTodoStore((state) => state.setUser);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({
    visible: false,
    msg: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const loggedUser = await login(user);
    if (!loggedUser.success) {
      handleToast("Error in Login. Provide valid credentials.");
    } else {
      console.log("userrrr logggedd inn....................", loggedUser.user);
      setStoreUser(loggedUser.user);
      navigate("/home");
    }
  };

  const handleToast = (msg) => {
    setToast({ visible: true, msg });
    setTimeout(() => {
      setToast({ visible: false, msg: "" });
    }, 5000);
  };

  return (
    <div className="bg-creamwhite min-h-screen flex flex-col">
      {toast.visible ? <Toast text={toast.msg} /> : null}
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Login</h1>

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-bglightdark text-white hover:bg-bgdark focus:outline-none my-1"
            onClick={loginUser}
          >
            Login
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Do not have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/signup"
          >
            Signup
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
