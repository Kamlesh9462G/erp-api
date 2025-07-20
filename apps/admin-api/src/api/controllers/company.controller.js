const httpStatus = require("http-status");
const catchAsync = require("@erp-system/common/utils/catchAsync");
const { companyService } = require("../../services/index");
const sendResponse = require("@erp-system/common/utils/sendResponse");

const addCompany = catchAsync(async (req,res) => {
  console.log(req.body);
    const response = await companyService.addCompany(req.body);
    return sendResponse(res, {
      statusCode: httpStatus.status.CREATED,
      success: true,
    message: "Company and Admin user created successfully",
      data: response,
    });
});

module.exports = {
  addCompany,
};
