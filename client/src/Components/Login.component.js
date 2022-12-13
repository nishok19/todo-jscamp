import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errormsg, setErrmsg] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const isLogged = await login(user);
    if (!isLogged.success) {
      setErrmsg("Error in Login", isLogged.err);
    }
    navigate("/home");
  };

  return (
    <div className="bg-creamwhite min-h-screen flex flex-col">
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
          <div>{errormsg}</div>
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
