const router = require("express").Router();
const UserBatch = require("../models/UserBatchScheme.js");
const User = require("../models/UserSchema.js");

router.put("/user/:userId", async (req, res) => {
  try {

    console.log(req.body)

    const userId = req.params.userId;
    const newBatchId = req.body.newBatchId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentDate = new Date();

    const userBatch = await UserBatch.findOne({ userId });

    if (userBatch) {
      const lastUpdated = userBatch.lastUpdated;

      if (
        lastUpdated.getMonth() !== currentDate.getMonth() ||
        lastUpdated.getFullYear() !== currentDate.getFullYear()
      ) {
        await UserBatch.findOneAndUpdated(
          { userId },
          { batchTimeId: newBatchId, lastUpdated: currentDate }
        );

        return res.status(200).json({ message: "Batch updated successfully." });
      } else {
        return res
          .status(400)
          .json({ message: "Batch updated allowed only once in a month." });
      }
    } else {
      const updatedBatch = await UserBatch.create({
        userId,
        batchTimesId: newBatchId,
        lastUpdate: currentDate,
      });
      return res.status(200).json({ message: "Batch added successfully." , ...updatedBatch._doc});
    }
  } catch (err) {
    console.log("Error updating batch : ", err);
    res.status(400).json(err);
  }
});

module.exports = router;
