const Joi = require("joi");

const validateParticipation = {
  body: Joi.object().keys({
    contestId: Joi.string().required(),
    answers: Joi.array().required(),
  }),
};

module.exports = {
  validateParticipation,
};
