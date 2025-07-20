const httpStatus = require("http-status");
const catchAsync = require("@erp-system/common/utils/catchAsync");
const { userService } = require("../../services/index");
const sendResponse = require("@erp-system/common/utils/sendResponse");

const addUser = catchAsync(async (req, res) => {
  req.body["company_id"] = req.user.company_id;
  req.body["created_by"] = req.user.user_id;
  const response = await userService.addUser(req.body);

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "User added successfully.",
    data: response,
  });
});
const getUser = catchAsync(async (req, res) => {
  let filterQuery = {};
  filterQuery["company_id"] = req.user.company_id;

  const response = await userService.getUser(filterQuery);

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "User fetched successfully.",
    data: response,
  });
});
const getUsers = catchAsync(async (req, res) => {
  let filterQuery = {};
  filterQuery["company_id"] = req.user.company_id;

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const options = { page, limit };

  const { results, total } = await userService.getUsers(filterQuery, options);

  const totalPages = Math.ceil(total / limit);

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "Users fetched successfully.",

    data: {
      users: results,
      meta: {
        page,
        limit,
        totalUsers: total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    },
  });
});
const updateUser = catchAsync(async (req, res) => {});
const deleteUser = catchAsync(async (req, res) => {
  let filterQuery = {};
  filterQuery["company_id"] = req.user.company_id;
  filterQuery["id"] = req.params.user_id;

  const response = await userService.deleteUser(filterQuery);

  return sendResponse(res, {
    statusCode: httpStatus.status.OK,
    success: true,
    message: "Users fetched successfully.",
    data: response,
  });
});

module.exports = {
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
