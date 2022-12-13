import { v4 as uuidv4 } from "uuid";

import { account } from "./appwrite.config";

export const signup = async (user) => {
  try {
    const createdUser = await account.create(
      uuidv4(),
      user.email,
      user.password,
      user.username
    );
    if (!createdUser) {
      throw new Error("Error is creating the user");
    }
    return { success: true, createdUser };
  } catch (err) {
    console.log(err);
    return { success: false, err };
  }
};

export const login = async (user) => {
  try {
    const loginUser = await account.createEmailSession(
      user.email,
      user.password
    );
    if (!loginUser) {
      throw new Error("Error in loging");
    }
    console.log("userrrr id", loginUser.$id);
    return { success: true, loginUser };
  } catch (err) {
    console.log("Error in loging in 'login'", err);
    return { success: false, err };
  }
};

export const logout = async () => {
  try {
    const isloggedOut = await account.deleteSession("current");
    if (!isloggedOut) throw new Error("error in 'logout'");
    console.log("logggedd outt", isloggedOut);
    return { success: true };
  } catch (err) {
    console.log("Err in 'logout'", err);
    return { success: false, err };
  }
};
