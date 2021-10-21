const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// @route GET /request/
// @desc List of requests for logged in user
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const ownerRequests = await Request.find({ owner: userId });
  const sitterRequests = await Request.find({ sitter: userId });

  if (!ownerRequests.length && !sitterRequests.length) {
    res.status(404);
    throw new Error("No requests found");
  }
  res.status(200).json({
    requestsSend: ownerRequests,
    requestsReceived: sitterRequests,
  });
});

// @route POST /request/
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.id;
  const { sitterId, startDate, endDate, serviceType, totalPrice } = req.body;

  if (!sitterId || !startDate || !endDate) {
    res.status(400);
    throw new Error("One of the required fields hasn't been completed");
  }
  const ownerExists = await User.findById(ownerId);
  const sitterExists = await User.findById(sitterId);

  if (ownerExists && sitterExists && ownerId !== sitterId) {
    const request = new Request({
      owner: ownerId,
      sitter: sitterId,
      startDate,
      endDate,
      serviceType,
      totalPrice,
    });

    await request.save();
    res.status(201).json({ request });
  }

  res.status(500);
  throw new Error("Error creating request");
});

// @route POST /request/:id
// @desc Update request dates, satus, serviceType and rating
// @access Private

exports.updateRequest = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const requestId = req.params.id;
  const input = req.body;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).send("Bad Request");
  }

  const request = await Request.findById(requestId);

  if (!request) {
    res.status(404);
    throw new Error("Request is not found.");
  }

  const isOwnedByUser = request.owner == userId || request.sitter == userId;

  if (isOwnedByUser) {
    Object.entries(input).forEach(([key, value]) => {
      if (value) {
        if (key === "startDate") {
          request.startDate = new Date(value);
        }
        if (key === "endDate") {
          request.endDate = new Date(value);
        } else {
          request[key] = value;
        }
      }
    });

    await request.save();
    return res.status(200).json({ request });
  }

  res.status(500);
  throw new Error("Error updating request");
});
