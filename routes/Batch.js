const router = require("express").Router();
const UserBatch = require("../models/UserBatchScheme.js");
const User = require("../models/UserSchema.js");
const Batch = require("../models/BatchSchema.js");

router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find();

    if (batches) {
      res.status(200).json(batches);
    } else {
      res.status(404).json({ message: "No batches found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// router.put("/user/:userId", async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const newBatchId = req.body.newBatchId;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const currentDate = new Date();

//     const userBatch = await UserBatch.findOne({ userId });

//     if (userBatch) {
//       const lastUpdate = userBatch.lastUpdated;

//       if (
//         lastUpdate.getMonth() !== currentDate.getMonth() ||
//         lastUpdate.getFullYear() !== currentDate.getFullYear()
//       ) {
//         await UserBatch.findOneAndUpdate(
//           { userId },
//           { batchTimesId: newBatchId, lastUpdate: currentDate }
//         );

//         return res.status(200).json({ message: "Batch updated successfully." });
//       } else {
//         return res
//           .status(400)
//           .json({ message: "Batch update allowed only once in a month." });
//       }
//     } else {
//       const updatedBatch = await UserBatch.create({
//         userId,
//         batchTimesId: newBatchId,
//         lastUpdate: currentDate,
//       });
//       return res
//         .status(200)
//         .json({ message: "Batch added successfully.", ...updatedBatch._doc });
//     }
//   } catch (err) {
//     console.log("Error updating batch : ", err);
//     res.status(400).json(err);
//   }
// });

router.post("/updatebatchtiming", async (req, res) => {
  const { userId, batchId } = req.body;

  try {
    const currentMonth = new Date().getMonth() + 1;
    const existingEnrollment = await UserBatch.findOne({
      userId,
      lastUpdated: {
        $gte: new Date(new Date().getFullYear(), currentMonth - 1, 1),
        $lt: new Date(new Date().getFullYear(), currentMonth, 1),
      },
    }).exec();

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "User has already set batch timing for this month" });
    }

    const batch = await Batch.findById(batchId);

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const newUserBatch = new UserBatch({
      userId,
      batchId,
    });

    await newUserBatch.save();

    res.status(201).json({
      message: "User batch timing updated successfully",
      enrollment: newUserBatch,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user batch timing",
      error: error.message,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const userBatch = await UserBatch.findOne({ userId: userId }).populate(
      "batchId"
    );

    if (!userBatch) {
      return res.status(404).json({ message: "user not found" });
    }

    const { batchId } = userBatch;
    const { start_time, end_time } = batchId;

    res.status(200).json({
      userId: userId,
      batchTimings: { start_time, end_time },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
