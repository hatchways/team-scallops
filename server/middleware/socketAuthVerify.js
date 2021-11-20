require("dotenv").config();
const jwt = require("jsonwebtoken");

const socketAuthVerify = (socket, next) => {
  let cookieString = socket.handshake.headers.cookie;
  cookieString = str.replace(/\s+/g, "");
  const cookies = cookieString.split(/[=;]/); // regex
  const tokenIndex = cookies.indexOf("token") + 1;
  const token = cookies[tokenIndex];
  if (!token) {
    next(new Error("No token, authorization denied"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded.id;
    next();
  } catch (err) {
    next(new Error("Token is not valid"));
  }
};

module.exports = socketAuthVerify;
