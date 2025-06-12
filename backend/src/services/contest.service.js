const { Contest } = require("../models");
const httpStatus = require("../utils/httpStatus");

const getContests = async (req) => {
  try {
    const { accessLevel } = req.user;
    const filter =
      accessLevel === "vip" || accessLevel === "admin"
        ? {}
        : { accessLevel: "normal" };

    const contests = await Contest.find(filter);
    return { status: httpStatus.OK, data: contests };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message };
  }
};

const createContest = async (body) => {
  try {
    const {
      title,
      description,
      startTime,
      endTime,
      accessLevel,
      prize,
      questions,
    } = body;

    questions.forEach((q) => {
      if (!["single", "multi", "boolean"].includes(q.type)) {
        throw new Error(`Invalid question type: ${q.type}`);
      }

      const correctOptions = q.options.filter((opt) => opt.isCorrect);
      if (correctOptions.length === 0) {
        throw new Error(`Question "${q.text}" has no correct answers`);
      }

      if (q.type === "single" && correctOptions.length > 1) {
        throw new Error(
          `Single-select question "${q.text}" has multiple correct answers`
        );
      }
    });

    const contest = new Contest({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      accessLevel,
      prize,
      questions,
    });

    await contest.save();
    return { status: httpStatus.CREATED, data: contest };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message };
  }
};

const getContestDetails = async (req) => {
  try {
    const contest = await Contest.findById(req.params.id);
    if (!contest) {
      return { status: httpStatus.NOT_FOUND, error: "Contest not found" };
    }

    return { status: httpStatus.OK, data: contest };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message };
  }
};

module.exports = { getContests, createContest, getContestDetails };
