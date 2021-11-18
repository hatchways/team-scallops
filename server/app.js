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
const notificationRouter = require("./routes/notification");
const profileRouter = require("./routes/profile");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");
const requestRouter = require("./routes/request");
const paymentRouter = require("./routes/payment");

const reviewsRouter = require("./routes/reviews");

const { cloudinaryConfig } = require("./config/cloudinary");

const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    //credentials: true,
    rejectUnauthorized: false,
  },
});

io.use(socketAuthVerify);

io.on("connection", (socket) => {
  if (!onlineUserLog.checkInLog(socket.user)) {
    const newUser = onlineUserLog.addUser(socket.user, socket.id);
    if (!newUser) return;

    const allUsersOnline = onlineUserLog.getAll();
    socket.broadcast.emit("allUsersOnlineRes", allUsersOnline);
  } else {
    socket.disconnect();
    return;
  }

  socket.on("disconnect", () => {
    const deletedUser = onlineUserLog.removeUser(socket.user);
    if (!deletedUser) return;

    const allUsersOnline = onlineUserLog.getAll();
    io.emit("allUsersOnlineRes", allUsersOnline);
  });

  socket.on("allUsersOnline", () => {
    const allUsersOnline = onlineUserLog.getAll();
    io.to(socket.id).emit("allUsersOnlineRes", allUsersOnline);
  });

  socket.on("sendMessage", (message, receiverId) => {
    if (
      !message.conversation ||
      !message.sender ||
      !message.text ||
      !message._id
    )
      return;

    const receiverSocket = onlineUserLog.getUserSocket(receiverId);
    if (!receiverSocket) return;
    io.to(receiverSocket).emit("newMessage", message);
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use("", cloudinaryConfig);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/notification", notificationRouter);
app.use("/profile", profileRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);
app.use("/request", requestRouter);
app.use("/payment", paymentRouter);
app.use("/reviews", reviewsRouter);

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
