const Joi = require("joi");

const validateContest = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    accessLevel: Joi.string().required(),
    prize: Joi.string().required(),
    questions: Joi.array().required(),
  }),
};

module.exports = {
  validateContest,
};
