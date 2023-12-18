const Batch = require("../models/BatchSchema.js"); // Import your Batch model

async function seedInitialBatchData() {
  try {
    const existingBatches = await Batch.find();

    if (existingBatches.length === 0) {
      const initialBatches = [
        { start_time: "5:00 AM", end_time: "6:00 AM" },
        { start_time: "7:00 AM", end_time: "8:00 AM" },
        { start_time: "8:00 AM", end_time: "9:00 AM" },
        { start_time: "6:00 PM", end_time: "6:00 PM" },
      ];

      await Batch.insertMany(initialBatches);
      console.log("Initial data inserted into Batch model.");
    } else {
      console.log("Batches already exist. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error seeding initial Batch data:", error);
  }
}

module.exports = seedInitialBatchData;
