const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");

// @route GET /request/all
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

// @route POST /request/create
// @desc Create a new request
// @access Private
exports.createRequest = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.id;
  const { sitterId, startDate, endDate, serviceType, totalPrice } = req.body;

  const ownerExists = await User.findById(ownerId);
  const sitterExists = await User.findById(sitterId);

  if (!ownerId || !sitterId || !startDate || !endDate) {
    res.status(400);
    throw new Error("One of the required fields hasn't been completed");
  }

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

  const request = await Request.findById(requestId);

  if (!request) {
    res.status(404);
    throw new Error("Request is not found.");
  }
  try {
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
  } catch {
    res.status(400);
    throw new Error("Error updating request");
  }
});
