const express = require("express");
const validate = require("../middlewares/validate");
const { rateLimiter } = require("../middlewares/rateLimit");
const auth = require("../middlewares/auth");
const {
  contestValidation: { validateContest },
} = require("../validations");
const {
  contestController: { getContests, getContestDetails, createContest },
} = require("../controllers");

const router = express.Router();

router.get(
  "/contests",
  rateLimiter(),
  auth(["user", "vip", "admin"]),
  getContests
);
router.get(
  "/contests/:id",
  rateLimiter(),
  auth(["user", "vip", "admin"]),
  getContestDetails
);
router.post(
  "/contests",
  validate(validateContest),
  rateLimiter(),
  auth(["admin"]),
  createContest
);

module.exports = router;
