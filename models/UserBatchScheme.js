const mongoose = require("mongoose");

const userBatchSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch", 
    },
    lastUpdated: {
      type: Date,
      default: Date.now(),
    },
  });
  

const usersBatchSchema = mongoose.model('usersBatchSchema', userBatchSchema);
module.exports = usersBatchSchema;