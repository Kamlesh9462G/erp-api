const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const { authRepository } = require("../repositories/index");
const ApiError = require("@erp-system/common/utils/ApiError");
const createAdmin = async (adminData) => {
  const adminExists = await authRepository.getAdmin({ email: adminData.email });
  if (adminExists) {
    throw new ApiError(
      httpStatus.status.BAD_REQUEST,
      `Admin already exists with email: ${adminData.email}`
    );
  }
  return await authRepository.createAdmin(adminData);
};
const getAdmin = async (filterQuery) => {
  return await authRepository.getAdmin(filterQuery);
};

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

const loginAdmin = async (loginData) => {
  const admin = await authRepository.getAdmin({ email: loginData.email });
  if (!admin) {
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      "Incorrect email or password."
    );
  }

  const isValidPassword = await checkPassword(loginData.password, admin.password);
  if (!isValidPassword) {
    throw new ApiError(
      httpStatus.status.UNAUTHORIZED,
      "Incorrect email or password."
    );
  }
  return admin;
};
module.exports = {
  createAdmin,
  getAdmin,
  loginAdmin,
};
