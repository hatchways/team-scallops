require("dotenv").config();
const jwt = require("jsonwebtoken");

const socketAuthVerify = (socket, next) => {
  // let cookieString = socket.handshake.headers.cookie;
  // cookieString = str.replace(/\s+/g, "");
  // const cookies = cookieString.split(/[=;]/); // regex
  // const tokenIndex = cookies.indexOf("token") + 1;
  // const token = cookies[tokenIndex];
  const token = socket.handshake.headers.cookie.split("=")[1];
  console.log("Socket Token: ", token);

  if (!token) {
    next(new Error("No token, authorization denied"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded.id;
    next();
  } catch (err) {
    next(new Error("Socket token is not valid"));
  }
};

module.exports = socketAuthVerify;
