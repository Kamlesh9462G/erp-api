const httpStatus = require("http-status");
const ApiError = require("@erp-system/common/utils/ApiError");
const { roleRepository } = require("../repositories/index");

const addRole = async (roleData) => {
  const existingRole = await roleRepository.getRole({
    role_name: roleData.role_name,
    slug: roleData.slug,
  });

  if (existingRole) {
    throw new ApiError(
      httpStatus.status.BAD_REQUEST,
      "Role with this name or slug already exists"
    );
  }
  return await roleRepository.addRole(roleData);
};

const getRole = async (filterQuery) => {
  const role = await roleRepository.getRole(filterQuery);

  if (!role) {
    throw new ApiError(httpStatus.status.NOT_FOUND, "Role not found");
  }

  return role;
};

const getRoles = async (filterQuery = {}) => {
  return await roleRepository.getRoles(filterQuery);
};

const updateRole = async (filterQuery, updateData) => {
  const role = await roleRepository.getRole(filterQuery);
  if (!role) {
    throw new ApiError(httpStatus.status.NOT_FOUND, "Role not found");
  }

  if (updateData.role_name || updateData.slug) {
    const existingRole = await roleRepository.getRole({
      role_name: updateData.role_name || role.role_name,
      slug: updateData.slug || role.slug,
      id: role.id,
    });

    if (existingRole) {
      throw new ApiError(
        httpStatus.status.BAD_REQUEST,
        "Another role with this name or slug already exists"
      );
    }
  }

  const { updatedRowsCount, updatedRows } = await roleRepository.updateRole(
    filterQuery,
    updateData
  );

  if (updatedRowsCount === 0) {
    throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, "Role update failed");
  }

  return updatedRows[0].get({ plain: true });
};

const deleteRole = async (filterQuery) => {
  const role = await roleRepository.getRole(filterQuery);
  if (!role) {
    throw new ApiError(httpStatus.status.NOT_FOUND, "Role not found");
  }

  const deletedCount = await roleRepository.deleteRole(filterQuery);

  if (deletedCount === 0) {
    throw new ApiError(
      httpStatus.status.INTERNAL_SERVER_ERROR,
      "Role deletion failed"
    );
  }

  return true;
};

module.exports = {
  addRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
};
