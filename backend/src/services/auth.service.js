const jwt = require("jsonwebtoken");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const httpStatus = require("../utils/httpStatus");
const config = require("../config/config");

const login = async (body) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("httpStatus.UNAUTHORIZED: ", httpStatus.UNAUTHORIZED);
      return { status: httpStatus.UNAUTHORIZED, error: "Invalid credentials" };
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiry }
    );

    return { status: httpStatus.OK, data: { token, role: user.role } };
  } catch (error) {
    return { status: httpStatus.INTERNAL_SERVER_ERROR, error: error.message };
  }
};

const signup = async (body) => {
  try {
    const { username, email, password, role } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    return { status: httpStatus.CREATED, data: "User created successfully" };
  } catch (error) {
    return { status: httpStatus.BAD_REQUEST, error: error.message };
  }
};

module.exports = { login, signup };
