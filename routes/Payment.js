const router = require("express").Router();
const User = require("../models/UserSchema");
const Payment = require("../models/PaymentSchema");

router.post("/pay", async (req, res) => {
  const { userId, userBatchId, amountPaid, paymentMethod } = req.body;

  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const existingPayment = await Payment.findOne({
      userId,
      paymentDate: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });

    if (existingPayment) {
      return res
        .status(400)
        .json({ message: "Payment already made for this month" });
    }

    const newPayment = new Payment({
      userId,
      userBatchId,
      paymentDate: new Date(),
      amountPaid,
      paymentMethod,
    });

    if (newPayment) {
      savedPayment = await newPayment.save();

      res
        .status(201)
        .json({ message: "Payment Successful", payment: savedPayment });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/history/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const payments = await Payment.find({ userId: userId }).exec();

    if (payments.length > 0) {
      res.status(200).json(payments);
    } else {
      res
        .status(404)
        .json({ message: "No history found ! Please make payment" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payment history ", err });
  }
});

// router.put("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     user.payment_status = true;

//     await user.save();

//     res.status(200).json({ message: "Payment status updated successfully" });
//   } catch (error) {
//     // res.status(500).json({ message: "Server error" });
//     console.log(error);
//   }
// });

module.exports = router;
