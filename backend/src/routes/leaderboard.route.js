const express = require("express");
const {
  leaderboardController: { getLeaderboard },
} = require("../controllers");

const router = express.Router();

router.get("/leaderboard", getLeaderboard);

module.exports = router;
