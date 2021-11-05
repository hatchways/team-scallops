require("dotenv").config();
const Profile = require("../models/Profile");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// see https://stripe.com/docs/payments/save-and-reuse for client side implementation details

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

// @route POST /payment/:id/pay
// @desc process payment for given profile id
// @access Private
exports.processPayment = asyncHandler(async (req, res, next) => {
  // const userId = req.user.id;
  const user = await User.findById(req.user.id);
  // const ownerRequests = await Request.find({ owner: userId });
  // const sitterRequests = await Request.find({ sitter: userId });

  // if (!ownerRequests.length && !sitterRequests.length) {
  //   res.status(404);
  //   throw new Error('No requests found');
  // }

  const token = req.body.stripeToken;

  const chargeT = {
    customer: user.stripeCustomerId,
    amount: 999,
    currency: "cad",
    description: "Test charge",
    source: token,
  };

  const charge = await stripe.charges.create({
    customer: userinDb.stripeCustomerId,
    amount: 1000,
    currency: "cad",
    description: "Test payment",
    source: token,
  });

  res.status(200);
  // .json({
  //   // requestsSend: ownerRequests,
  //   // requestsReceived: sitterRequests,
  // });
});

exports.addCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const token = req.body.stripeToken;

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

exports.getCards = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const list = await stripe.customers.listSources(user.stripeCustomerId, {
    object: "card",
    limit: 5,
  });

  const customer = await stripe.customers.retrieve(user.stripeCustomerId);

  // id: string;
  // brand: string;
  // expYear: string;
  // expMonth: string;
  // last4: string;
  // name: string;
  // email: string;

  const cardList = list.data.map((card) => {
    const { id, brand, exp_year, exp_month, last4, name } = card;
    return { id, brand, expYear: exp_year, expMonth: exp_month, last4, name };
  });

  // if (!card.error) {
  //   res.status(200).json({ success: true });
  // } else {
  //   res
  //     .status(500)
  //     .json({ error: { message: 'Error saving card to User profile' } });
  // }
  res.status(200).json({
    success: {
      cards: cardList,
      defaultCardId: customer.default_source,
    },
  });
});

exports.UpdateDefaultCard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const cardId = req.params.cardId;

  const customer = await stripe.customers.update(user.stripeCustomerId, {
    default_source: cardId,
  });

  if (!customer) {
    // check error code
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
