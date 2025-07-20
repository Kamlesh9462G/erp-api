const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");
const { Admin } = require("@erp-system/common/models");

const createAdmin = async (adminData) => {
  try {
    return await Admin.create(adminData);
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
const getAdmin = async (filterQuery) => {
  try {
    return await Admin.findOne({where:filterQuery,raw:true});
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = {
  createAdmin,
  getAdmin,
};
