const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Batch'
  },
  payment_status: {
    type: Boolean,
    default: false,
    required:false
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
