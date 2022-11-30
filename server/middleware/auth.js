const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");

const auth = async (req, res, next) => {
  try {
    // const { token } = req.cookies || req.body;
    const bearerToken = req.headers.authorization;

    const token = bearerToken.split(" ")[1];
    console.log("weeeehaaa token is here.....", token);
    if (!token) res.status(401).send("No token found login again");
    const user = jwt.verify(token, JWT_SECRET);
    req.body.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log("JSON token error ", err);
  }
};

module.exports = auth;
