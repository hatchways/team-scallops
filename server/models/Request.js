const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const requestSchema = new mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sitter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACCEPTED", "DECLINED", "PAID"],
    },
    serviceType: {
      type: String,
      enum: ["BOARDING", "HOUSE_SITTING", "DAY_CARE", "WALKING"],
    },
    totalPrice: {
      type: Number,
    },
    rating: {
      type: Number,
    },
  },
  { timestamps: true }
);

requestSchema.pre("validate", function (next) {
  this.startDate > this.endDate
    ? next(new Error("End date must be greater than start date"))
    : next();
});

module.exports = Request = model("Request", requestSchema);
