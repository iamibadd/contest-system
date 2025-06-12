const express = require("express");
const validate = require("../middlewares/validate");
const {
  authValidation: { validateSignup, validateLogin },
} = require("../validations");
const {
  authController: { signup, login },
} = require("../controllers");

const router = express.Router();

router.post("/signup", validate(validateSignup), signup);
router.post("/login", validate(validateLogin), login);

module.exports = router;
