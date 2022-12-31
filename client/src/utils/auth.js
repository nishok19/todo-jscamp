import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/auth/login",
      data: {
        email,
        password,
      },
    });
    if (!res) throw new Error("Error in 'Login-auth'");
    return { success: true, user: res.data };
  } catch (err) {
    console.log("Error in login ", err);
    return { success: false, err };
  }
};

export const signup = async ({ username, email, password }) => {
  try {
    const res = await axios({
      method: "post",
      url: "/api/auth/signup",
      data: {
        username,
        email,
        password,
      },
    });
    if (!res) throw new Error("Error in 'Signup-auth'");
    return { success: true, user: res.data };
  } catch (err) {
    console.log("Error in signup ", err);
    return { success: false, err };
  }
};

export const logout = async () => {};
