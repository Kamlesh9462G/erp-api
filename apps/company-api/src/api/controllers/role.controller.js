const httpStatus = require("http-status");
const catchAsync = require("@erp-system/common/utils/catchAsync");
const { roleService } = require("../../services/index");
const sendResponse = require("@erp-system/common/utils/sendResponse");

const addRole = catchAsync(async (req, res) => {
  console.log(req.body);
  req.body.permissions.push("get_me");
  const response = await roleService.addRole(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "Role added successfully.",
    data: response,
  });
});
const getRole = catchAsync(async (req, res) => {
  const response = await roleService.getRoles();

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "Role fetched successfully.",
    data: response,
  });
});
const getRoles = catchAsync(async (req, res) => {
  const response = await roleService.getRoles();

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "Roles fetched successfully.",
    data: response,
  });
});
const updateRole = catchAsync(async (req, res) => {});
const deleteRole = catchAsync(async (req, res) => {});

module.exports = {
  addRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
};
