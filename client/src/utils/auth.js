import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

export const login = async ({ email, password }) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios({
      method: "post",
      url: `${baseUrl}/api/auth/login`,
      headers: {
        withCredentials: true,
      },
      data: {
        email,
        password,
      },
    });
    console.log("userrrrrrrrrrrrrrr", res);
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
      url: `${baseUrl}/api/auth/signup`,
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

export const logout = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    console.log("looogout", res);
    if (!res) throw new Error("Error in 'logout-auth'");
    return { success: true, res };
  } catch (err) {
    console.log("Error in logout ", err);
    return { success: false, err };
  }
};
