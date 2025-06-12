const express = require("express");
const validate = require("../middlewares/validate");
const { rateLimiter } = require("../middlewares/rateLimit");
const auth = require("../middlewares/auth");
const {
  participationValidation: { validateParticipation },
} = require("../validations");
const {
  participationController: { submitAnswers },
} = require("../controllers");

const router = express.Router();

router.post(
  "/participate",
  validate(validateParticipation),
  rateLimiter(),
  auth(["user", "vip", "admin"]),
  submitAnswers
);

module.exports = router;
