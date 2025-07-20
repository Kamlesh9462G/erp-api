const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");

const { CompanyUser } = require("@erp-system/common/models/index");

const addUser = async (roleData) => {
  try {
    return await CompanyUser.create(roleData);
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

const getUser = async (filterQuery) => {
  try {
    return await CompanyUser.findOne({
      where: filterQuery,
      raw: true,
    });
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

const getUsers = async (filterQuery = {}, options = {}) => {
  try {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    const { count, rows } = await CompanyUser.findAndCountAll({
      where: filterQuery,
      raw: true,
      limit,
      offset,
      order: [['created_at', 'DESC']], 
    });

    return {
      results: rows,
      total: count,
    };
  } catch (error) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error);
  }
};

const updateUser = async (filterQuery, updateData) => {
  try {
    const [updatedRowsCount, updatedRows] = await CompanyUser.update(
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

const deleteUser = async (filterQuery) => {
  try {
    return await CompanyUser.update(
      {
        is_deleted: true,
        updated_at: new Date(),
      },
      { where: filterQuery }
    );
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
  }
};


module.exports = {
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
