const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");
const { CompanyUserRole } = require("@erp-system/common/models/index");
const addCompanyUserRole = async (companyData) => {
  try {
    return await CompanyUserRole.create(companyData);
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
const getCompanyUserRole = async (filterQuery) => {
  try {
    return await CompanyUserRole.findOne({ where: filterQuery, raw: true });
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = {
  addCompanyUserRole,
  getCompanyUserRole,
};
