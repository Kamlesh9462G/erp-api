const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");

const { CompanyUserRole } = require("@erp-system/common/models/index");

const addRole = async (roleData) => {
  try {
    return await CompanyUserRole.create(roleData);
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

const getRole = async (filterQuery) => {
  try {
    return await CompanyUserRole.findOne({
      where: filterQuery,
      raw: true,
    });
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

const getRoles = async (filterQuery = {}) => {
  try {
    return await CompanyUserRole.findAll({
      where: filterQuery,
      raw: true,
    });
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

const updateRole = async (filterQuery, updateData) => {
  try {
    const [updatedRowsCount, updatedRows] = await CompanyUserRole.update(
      updateData,
      {
        where: filterQuery,
        returning: true,
      }
    );
    return { updatedRowsCount, updatedRows };
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

const deleteRole = async (filterQuery) => {
  try {
    return await CompanyUserRole.destroy({
      where: filterQuery,
    });
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

module.exports = {
  addRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
};
