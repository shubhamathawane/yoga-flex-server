const { body, validationResult } = require("express-validator");
const User = require("../models/UserSchema");

const userValidationRules = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });

        if (user) {
          throw new Error("Email is already exists");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("age")
      .isInt({ min: 18, max: 65 })
      .withMessage("Age must be between 18 to 65."),
  ];
};


module.exports = userValidationRules