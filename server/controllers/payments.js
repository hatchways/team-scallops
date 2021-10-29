const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// see https://stripe.com/docs/payments/save-and-reuse for client side implementation details

exports.stripeSetup = asyncHandler(async (req, res) => {
  const customer = await stripe.customers.create({
    id: req.user.id,
    email: req.user.email,
  });
  if (!customer.error) {
    res.status(200).json({ customer });
  } else {
    res.status(500).json(customer.error);
  }
});

exports.secret = asyncHandler(async (req, res) => {
  const intent = await stripe.setupIntents.create({
    customer: req.user.id,
    payment_method_types: ["bancontact", "card", "ideal"],
  });
  if (!intent.error) {
    res.status(200).json({ client_secret: intent.client_secret });
  } else {
    res.status(500).json(intent.error);
  }
});
