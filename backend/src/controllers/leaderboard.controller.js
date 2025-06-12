const { leaderboardService } = require("../services");

const getLeaderboard = async (req, res) => {
  const { status, data, error } = await leaderboardService.getLeaderboard(
    req.params.contestId
  );
  res.status(status).json({ data, error });
};

module.exports = { getLeaderboard };
