const rateLimit = require("express-rate-limit");

const rateLimiter = ({ timeout = 15 * 60 * 1000, maxCalls = 100 } = {}) => {
  return rateLimit({
    windowMs: timeout,
    max: maxCalls,
    message: "Too many requests from this IP",
  });
};

module.exports = { rateLimiter };
