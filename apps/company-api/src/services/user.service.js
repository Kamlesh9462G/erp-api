const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");
const { userRepository } = require("../repositories/index");

const addUser = async (userData) => {
  const existingUser = await userRepository.getUser({
    email: userData.email,
  });

  if (existingUser) {
    throw new ApiError(
      httpStatus.status.BAD_REQUEST,
      "USer with this email already exists"
    );
  }
  return await userRepository.addUser(userData);
};

const getUser = async (filterQuery) => {
  const user = await userRepository.getUser(filterQuery);

  if (!user) {
    throw new ApiError(httpStatus.status.NOT_FOUND, "User not found");
  }

  return user;
};

const getUsers = async (filterQuery = {}, options = {}) => {
  const { page = 1, limit = 10 } = options;
  
  return await userRepository.getUsers(filterQuery, {
    page,
    limit,
  });
};

const updateUser = async (filterQuery, updateData) => {
  const user = await userRepository.getUser(filterQuery);
  if (!user) {
    throw new ApiError(httpStatus.status.NOT_FOUND, "User not found");
  }

  if (updateData.email) {
    const existingUser = await userRepository.getUser({
      email: updateData.email,
      id: user.id,
    });

    if (existingUser) {
      throw new ApiError(
        httpStatus.status.BAD_REQUEST,
        "Another user with this email already exists"
      );
    }
  }

  const { updatedRowsCount, updatedRows } = await userRepository.updateUser(
    filterQuery,
    updateData
  );

  if (updatedRowsCount === 0) {
    throw new ApiError(
      httpStatus.status.INTERNAL_SERVER_ERROR,
      "User update failed"
    );
  }

  return updatedRows[0].get({ plain: true });
};

const deleteUser = async (filterQuery) => {
  const user = await roleRepository.getUser(filterQuery);
  if (!user) {
    throw new ApiError(httpStatus.status.NOT_FOUND, "User not found");
  }

  const deletedCount = await userRepository.deleteUser(filterQuery);

  if (deletedCount === 0) {
    throw new ApiError(
      httpStatus.status.INTERNAL_SERVER_ERROR,
      "User deletion failed"
    );
  }

  return true;
};

module.exports = {
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
