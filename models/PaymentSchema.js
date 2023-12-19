const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userBatchID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserBatch",
  },
  paymentDate: Date,
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentMethod: String,
  timestamp: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
