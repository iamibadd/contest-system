const { contestService } = require("../services");

const getContests = async (req, res) => {
  const { status, data, error } = await contestService.getContests(req);
  res.status(status).json({ data, error });
};

const createContest = async (req, res) => {
  const { status, data, error } = await contestService.createContest(req.body);
  res.status(status).json({ data, error });
};

const getContestDetails = async (req, res) => {
  const { status, data, error } = await contestService.getContestDetails(req);
  res.status(status).json({ data, error });
};

module.exports = { getContests, createContest, getContestDetails };
