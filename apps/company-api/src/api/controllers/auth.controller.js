
const httpStatus = require("http-status");
const catchAsync = require("@erp-system/common/utils/catchAsync");
const { authService,tokenService } = require("../../services/index");
const sendResponse = require("@erp-system/common/utils/sendResponse");

const loginCompanyUser = async (req, res) => {
  const response = await authService.loginCompanyUser(req.body);
  const token = await tokenService.generateAuthTokens(response);

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "Admin logged in successfully.",
    data: token,
  });
};

module.exports = {
  loginCompanyUser,
};
