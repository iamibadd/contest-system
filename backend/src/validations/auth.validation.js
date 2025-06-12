const Joi = require("joi");

const validateSignup = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    role: Joi.string().valid("guest", "user", "vip", "admin").required(),
  }),
};

const validateLogin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  validateSignup,
  validateLogin,
};
