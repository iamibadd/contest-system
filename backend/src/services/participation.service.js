const { Contest, Participation } = require("../models");
const httpStatus = require("../utils/httpStatus");

const submitAnswers = async (req) => {
  try {
    const { contestId, answers } = req.body;
    const { role, id } = req.user;

    const contest = await Contest.findById(contestId);

    if (contest.accessLevel === "vip" && !["vip", "admin"].includes(role)) {
      return {
        status: httpStatus.FORBIDDEN,
        error: "VIP contest access required",
      };
    }

    let score = 0;
    contest.questions.forEach((question, index) => {
      const userAnswer = answers.find((a) => a.questionId.equals(question._id));
      if (userAnswer) {
        const correctOptions = question.options
          .map((opt, i) => (opt.isCorrect ? i : -1))
          .filter((i) => i !== -1);

        const isCorrect = arraysEqual(
          userAnswer.selectedOptions.sort(),
          correctOptions.sort()
        );

        if (isCorrect) score += question.points;
      }
    });

    const participation = new Participation({
      user: id,
      contest: contestId,
      answers,
      score,
      isSubmitted: true,
    });

    await participation.save();
    return {
      status: httpStatus.OK,
      data: score,
    };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message };
  }
};

const arraysEqual = (a, b) =>
  a.length === b.length && a.every((val, i) => val === b[i]);

module.exports = { submitAnswers };
