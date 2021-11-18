require("dotenv").config();
const jwt = require("jsonwebtoken");

const socketAuthVerify = (socket, next) => {
  const token = socket.handshake.headers.cookie.split("=")[1];

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
