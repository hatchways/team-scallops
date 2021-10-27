const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const socketAuthVerify = require("./middleware/socketAuthVerify");
const onlineUserLog = require("./utils/onlineUserLog");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");
const requestRouter = require("./routes/request");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.use(socketAuthVerify);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    onlineUserLog.removeUser(socket.user);
  });

  socket.on("online", () => {
    if (!onlineUserLog.checkInLog(socket.user)) {
      const newUser = onlineUserLog.addUser(socket.user, socket.id);
      socket.join("online");
      socket.to("online").emit("newUserOnline", newUser);
    }
    return;
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profile", profileRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);
app.use("/request", requestRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
