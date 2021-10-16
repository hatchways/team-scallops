import mongoose from "mongoose";

const { Schema, model } = mongoose;

const requestSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    provider: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    accepted: { type: Boolean, default: false },
    declined: { type: Boolean, default: false },
    paid: { type: Boolean, default: false },
    serviceType: {
      type: String,
      enum: ["Boarding", "House Sitting", "Day Care", "Walking"],
    },
    totalPrice: { type: Number, required: true },
    rating: { type: Number },
  },
  { timestamps: true }
);

export default model("request", requestSchema);
