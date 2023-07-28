const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("../errors");
const User = require("../models/User");
const createTokenUser = require("../utils/createToken");
const { attachedCookies } = require("../utils/jwt");

const register = async (req, res) => {
  const { userName, email, password, userRole } = req.body;
  if (!email || !password || !userRole) {
    throw new BadRequestError("Please provide complete fields.");
  }
  const newUser = await User.create({
    userName,
    email,
    password,
    userRole,
  });
  const tokenUser = createTokenUser(newUser);
  attachedCookies({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ newUser });
};

module.exports = { register };
