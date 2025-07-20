const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { userRepository } = require("../repositories/index");
const ApiError = require("@erp-system/common/utils/ApiError");

const checkPassword = async (inputPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new ApiError(
      httpStatus.status.INTERNAL_SERVER_ERROR,
      "Error while verifying password."
    );
  }
};

const loginCompanyUser = async (loginData) => {
  const user = await userRepository.getUser({ email: loginData.email });
  if (!user) {
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      "Incorrect email or password."
    );
  }

  const isValidPassword = await checkPassword(
    loginData.password,
    user.password
  );
  if (!isValidPassword) {
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      "Incorrect email or password."
    );
  }
  return user;
};
module.exports = {
  loginCompanyUser,
};
