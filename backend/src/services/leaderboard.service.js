const { Participation } = require("../models");
const httpStatus = require("../utils/httpStatus");

const getLeaderboard = async (contestId) => {
  try {
    const leaderboard = await Participation.aggregate([
      { $match: { contest: mongoose.Types.ObjectId(contestId) } },
      { $sort: { score: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          "user.password": 0,
          "user.email": 0,
        },
      },
    ]);

    return { status: httpStatus.OK, data: leaderboard };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message };
  }
};

module.exports = { getLeaderboard };
