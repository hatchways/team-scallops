require("dotenv").config();
const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

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

  console.log("Until here!");

  // check if the payment mehtod exist for the owner
  const cards = await stripe.customers.listSources(
    ownerExists.stripeCustomerId,
    {
      object: "card",
      limit: 5,
    }
  );
  console.log("Until here too!");

  if (!cards.data.length) {
    res
      .status(400)
      .json({ error: { message: "No cards are there in User profile" } });
  }
  console.log("Until here 3!");

  // add a hold if the payment method exists
  const charge = await stripe.charges.create({
    amount: totalPrice * 100,
    currency: "cad",
    description: "Charge for dog sitting",
    customer: ownerExists.stripeCustomerId,
    capture: false,
  });

  console.log(charge.status);

  if (charge.status === "failed") {
    return res.status(400).json({ error: { message: "Cards was declined" } });
  }

  if (ownerExists && sitterExists && ownerId !== sitterId) {
    const request = new Request({
      owner: ownerId,
      sitter: sitterId,
      startDate,
      endDate,
      serviceType,
      totalPrice,
      chargeId: charge.id,
    });

    await request.save();
    return res.status(201).json({ request });
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
    await Promise.all(
      Object.entries(input).map(async ([key, value]) => {
        if (value) {
          if (key === "status" && value === "PAID") return;
          else if (key === "status" && value === "ACCEPTED") {
            // try to charge the payment here
            console.log("Accepted");
            const charge = await stripe.charges.capture(request.chargeId);
            if (charge.status === "failed") {
              res.status(400);
            } else {
              console.log("Status changed");
              request.status = "PAID";
            }
          } else if (key === "status" && value === "DECLINED") {
            // remove the hold
            console.log("Remove the charge please!!!");
          } else if (key === "startDate") {
            request.startDate = new Date(value);
          } else if (key === "endDate") {
            request.endDate = new Date(value);
          } else {
            request[key] = value;
          }
        }
      })
    );

    console.log(request);

    await request.save();
    return res.status(200).json({ request });
  }

  res.status(500);
  throw new Error("Error updating request");
});
