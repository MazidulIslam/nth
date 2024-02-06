import mongoose, { Schema } from 'mongoose';

const depositSchema = new Schema(
  {
    title: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Deposit =
  mongoose.models.Deposit || mongoose.model('Deposit', depositSchema);

export default Deposit;
