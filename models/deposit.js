import mongoose, { Schema } from "mongoose";

const depositSchema = new Schema(
  {
    name: {
      type: String,
      required: "Please enter your full name",
    },
    amount: {
      type: Number,
      required: "Please enter amount.",
    },
    payment_method: {
      type: String,
      required: "Please enter payment amount.",
    },
    transaction_id: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

const Deposit =
  mongoose.models.Deposit || mongoose.model("Deposit", depositSchema);

export default Deposit;
