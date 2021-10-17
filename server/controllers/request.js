const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request/all
// @desc List of requests for logged in user
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const isValidUser = await User.findById(userId);

  if (isValidUser) {
    const ownerRequests = await Request.find({ owner: id });
    const sitterRequests = await Request.find({ sitter: id });

    res.status(200).json({
      requestsSend: ownerRequests,
      requestsReceived: sitterRequests,
    });
  }

  res.status(404);
  throw new Error("No requests found");
});

// @route POST /request/create
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.id;
  const { sitterId, startDate, endDate, serviceType, totalPrice } = req.body;

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

  res.status(400);
  throw new Error("Error creating request");
});

// @route PUT /request/update/:id
// @desc Update request dates, satus, serviceType and rating
// @access Private

exports.updateRequest = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const requestId = req.params.id;
  const input = req.body;

  console.log({ userId, requestId, input });
  const isValidUser = await User.findById(userId);
  const isOwner = await Request.find({ owner: userId });

  if (isValidUser && isOwner) {
    const request = await Request.findById(requestId);

    if (!request) {
      res.status(400);
      throw new Error("Request is not found.");
    }

    Object.entries(input).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) {
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

  res.status(400);
  throw new Error("Error updating request");
});
