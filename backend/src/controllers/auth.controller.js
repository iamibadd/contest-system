const { authService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res) => {
  const { status, data, error } = await authService.login(req.body);
  console.log("status: ", status);
  res.status(status).json({ data, error });
});

const signup = catchAsync(async (req, res) => {
  const { status, data, error } = await authService.signup(req.body);
  res.status(status).json({ data, error });
});

module.exports = { login, signup };
