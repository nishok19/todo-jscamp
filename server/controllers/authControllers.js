const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/env.config");

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.send(401).send("All the fields are required");

    let user = await User.findOne({ email });
    const isPwdCrct = await bcrypt.compare(password, user.password);
    if (!user || !isPwdCrct)
      throw new Error("Error is login due to bad credentials");

    const token = await jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    user.password = undefined;
    console.log("User .. ", user);

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({ user, token });
  } catch (err) {
    console.log("Error in login ", err);
    res.status(401).json(err);
  }
};

exports.signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.send(401).send("All fields are required");

    const hashPwd = await bcrypt.hash(password, 10);

    const isUserFound = await User.findOne({ email });

    //   console.log(isUserFound);

    if (isUserFound)
      res.status(401).send("This email id is already registered");

    const user = await User.create({
      username,
      email,
      password: hashPwd,
    });
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    console.log("Error is signup ", err);
    res.status(401).json(err);
  }
};
