const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const {
  companyRepository,
  companyRoleRepository,
  companyUserRepository,
} = require("../repositories/index");
const ApiError = require("@erp-system/common/utils/ApiError");

const addCompany = async (companyData) => {
  const existingCompany = await companyRepository.getCompany({
    name: companyData.name,
  });

  if (existingCompany) {
    throw new ApiError(httpStatus.status.CONFLICT, "Company already exists");
  }

  const existingUser = await companyUserRepository.getCompanyUser({
    email: companyData.contact_email,
  });

  if (existingUser) {
    throw new ApiError(
      httpStatus.status.CONFLICT,
      "Admin email already exists"
    );
  }

  const company = await companyRepository.addCompany({
    ...companyData,
    created_by: "SUPER_ADMIN",
  });

  let caRole = await companyRoleRepository.getCompanyUserRole({
    slug: "company_admin",
  });

  if (!caRole) {
    caRole = await companyRoleRepository.addCompanyUserRole({
      role_name: "Company Admin",
      slug: "company_admin",
      description: "Manages users, settings, and overall company operations",
      permissions: ["all"],
    });
  }

  const adminUser = await companyUserRepository.addCompanyUser({
    name: companyData.name,
    email: companyData.contact_email,
    password: "COMPANY_CA",
    company_id: company.id,
    role_id: caRole.id,
  });

  return adminUser;
};

module.exports = {
  addCompany,
};
