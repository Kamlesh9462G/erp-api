const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");
const { Company } = require("@erp-system/common/models/index");
const addCompany = async (companyData) => {
  try {
    return await Company.create(companyData);
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
const getCompany = async (filterQuery) => {
  try {
    return await Company.findOne({ where: filterQuery, raw: true });
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = {
  addCompany,
  getCompany,
};
