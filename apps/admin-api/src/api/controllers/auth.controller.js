const httpStatus = require("http-status");
const catchAsync = require("@erp-system/common/utils/catchAsync");
const { authService, tokenService } = require("../../services/index");
const sendResponse = require("@erp-system/common/utils/sendResponse");
const signupAdmin = catchAsync(async (req, res) => {
  const response = await authService.createAdmin(req.body);
  return sendResponse(res, {
    statusCode: httpStatus.status.CREATED,
    success: true,
    message: "Admin account created successfully.",
    data: response,
  });
});
const loginAdmin = catchAsync(async (req, res) => {
  const response = await authService.loginAdmin(req.body);
  const token = await tokenService.generateAuthTokens(response);

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "Admin logged in successfully.",
    data: token,
  });
});

module.exports = {
  signupAdmin,
  loginAdmin,
};
