const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./VerifyTokenMiddleware");
const User = require("../models/UserSchema");
const UserBatch = require("../models/UserBatchScheme");
const userValidationRules = require("../utils/UserValidator");
const Batch = require('../models/BatchSchema');

const { validationResult } = require("express-validator");

router.post("/register", userValidationRules(), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      age: req.body.age,
      batch: req.body.batch,
    });

    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json({ message: "User does not exists!" });

    if (user) {
      try {
        const validate = await bcrypt.compare(req.body.password, user.password);

        !validate && res.status(400).json({ message: "Wrong password" });

        const accessToken = jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_KEY,
          { expiresIn: "3d" }
        );

        const userId = user._id;

        const userBatch = await UserBatch.findOne({ userId }).populate("batchTimesId").populate("userId")


        console.log(userBatch);

        // if (batchDetails && userBatch) {
        //   const responsePayload = {
        //     status: "Successfully Login",
        //     ...user._doc,
        //     batch: batchDetails,
        //     accessToken,
        //   };
        //   res.status(200).json(responsePayload);
        // } else {

        res
          .status(200)
          .json({ status: "Successfully Login", ...user._doc, accessToken,userBatch });
        // }

      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    res.status(404).json({ message: "Cannot Login ! Wrong credentials!" });
  }
});

module.exports = router;
