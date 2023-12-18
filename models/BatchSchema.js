const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
});

const Batch = mongoose.model("Batch", batchSchema);
module.exports = Batch
