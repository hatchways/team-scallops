const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// see https://stripe.com/docs/payments/save-and-reuse for client side implementation details

exports.stripeSetup = async (email) => {
  const customer = await stripe.customers.create({
    email,
  });
  console.log({ customer });
  if (!customer.error) {
    return customer.id;
  } else {
    return { error: customer.error };
  }
};

exports.secret = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const intent = await stripe.setupIntents.create({
    customer: user.StripeCustomerId,
    payment_method_types: ["card"],
  });
  if (!intent.error) {
    res.status(200).json({ client_secret: intent.client_secret });
  } else {
    res.status(500).json(intent.error);
  }
});
