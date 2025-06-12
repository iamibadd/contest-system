const cron = require("node-cron");
const { User, Contest, Participation } = require("../models");

const schedulePrizeDistribution = () => {
  // Run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const now = new Date();
      const contests = await Contest.find({
        endTime: { $lt: now },
        prizeDistributed: { $ne: true },
      });

      for (const contest of contests) {
        const winner = await Participation.findOne({
          contest: contest._id,
          isSubmitted: true,
        })
          .sort({ score: -1 })
          .populate("user");

        if (winner) {
          await User.findByIdAndUpdate(winner.user._id, {
            $push: {
              prizes: {
                contest: contest._id,
                prize: contest.prize,
              },
            },
          });

          contest.prizeDistributed = true;
          await contest.save();
          console.log(
            `Prize distributed for ${contest.title} to ${winner.user.username}`
          );
        }
      }
    } catch (error) {
      console.error("Prize distribution error:", error);
    }
  });
};

module.exports = { schedulePrizeDistribution };
