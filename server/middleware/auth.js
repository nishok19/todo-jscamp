const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.config");

const auth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const bearerToken = req.headers.authorization;
    console.log(
      "cooooooooooookiessssssssssssssssssssssss...",
      req.headers,
      bearerToken
    );
    const token = cookies?.jwt || bearerToken?.split(" ")[1];
    console.log("weeeehaaa token is here.....", token);
    if (!token) return res.status(401).send("No token found, login again");
    const user = jwt.verify(token, JWT_SECRET);
    //
    req.body.user = user;
    req.body.jwt = token;
    console.log(user);
    next();
  } catch (err) {
    console.log("JSON token auth error ", err);
    res.status(401).send(err);
  }
};

module.exports = auth;
