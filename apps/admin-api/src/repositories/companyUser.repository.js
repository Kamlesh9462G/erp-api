const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");
const { CompanyUser } = require("@erp-system/common/models/index");
const addCompanyUser = async (companyData) => {
  try {
    return await CompanyUser.create(companyData);
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
const getCompanyUser = async (filterQuery) => {
  console.log(filterQuery)
  try {
    return await CompanyUser.findOne({ where: filterQuery, raw: true });
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};
module.exports = {
  addCompanyUser,
  getCompanyUser,
};
