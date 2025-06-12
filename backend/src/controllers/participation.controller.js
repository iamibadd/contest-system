const { participationService } = require("../services");

const submitAnswers = async (req, res) => {
  const { status, data, error } = await participationService.submitAnswers(req);
  res.status(status).json({ data, error });
};

module.exports = { submitAnswers };
