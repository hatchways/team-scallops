const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");
 const UserModel = require("../models/User");


exports.getNotifi = asyncHandler(async (req, res) => {

  const { id } = req.params;
 

  const user = await Notification.findOne({ receiver: id })
  .populate("notifications.user")
  .populate("notifications.post");
  
return res.json(user.notifications);

 
});

exports.postNotifi = asyncHandler(async (req, res) => {

  const { revId, sendId } = req.params;
  const {title,message}= req.body

  const notificationTest = {
    type:"serviceRequest",
    receiver:revId,
    sender:sendId,
    title,
    message
  }
  const user = await Notification.findOne({ user: revId })

  await user.notifications.push(notificationTest)
  await user.save()
  
return res.json(user);

 
});


// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { userId } = req;

//     const user = await UserModel.findById(userId);

//     if (user.unreadNotification) {
//       user.unreadNotification = false;
//       await user.save();
//     }
//     return res.status(200).send("Updated");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Server Error");
//   }
// });


