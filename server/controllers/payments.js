require("dotenv").config();
const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.stripeSetup = async (email) => {
  const customer = await stripe.customers.create({
    email,
  });
  if (!customer.error) {
    return customer.id;
  } else {
    return { error: customer.error };
  }
};

// @route POST /payment/add
// @desc Add a new card to the list of payment methods
// @access Private
exports.addCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const token = req.body.stripeToken;
  if (!token) {
    res.status(400).json({ error: { message: "Card token not supplied" } });
  }
  const card = await stripe.customers.createSource(user.stripeCustomerId, {
    source: token,
  });

  if (!card.error) {
    res.status(200).json({ success: true });
  } else {
    res
      .status(500)
      .json({ error: { message: "Error saving card to User profile" } });
  }
});

// @route GET /payment/
// @desc Get list of card for the given user
// @access Private
exports.getCards = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const list = await stripe.customers.listSources(user.stripeCustomerId, {
    object: "card",
    limit: 5,
  });

  const customer = await stripe.customers.retrieve(user.stripeCustomerId);

  const cardList = list.data.map((card) => {
    const { id, brand, exp_year, exp_month, last4, name } = card;
    return { id, brand, expYear: exp_year, expMonth: exp_month, last4, name };
  });

  res.status(200).json({
    success: {
      cards: cardList,
      defaultCardId: customer.default_source,
    },
  });
});

// @route PATCH /payment/:cardId
// @desc Update the default card for payment
// @access Private
exports.UpdateDefaultCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const cardId = req.params.cardId;

  if (!cardId) {
    res
      .status(400)
      .json({ error: { message: "Error, cardId must be supplied" } });
  }

  const customer = await stripe.customers.update(user.stripeCustomerId, {
    default_source: cardId,
  });

  if (!customer) {
    res
      .status(400)
      .json({ error: { message: "Error updating the card on Stripe end" } });
  }

  res.status(200).json({
    success: {
      defaultCardId: customer.default_source,
    },
  });
});
