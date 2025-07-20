const httpStatus = require("http-status");
const { CompanyUserRole } = require("../models/index");

const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      const role = await CompanyUserRole.findOne({
        where: { id: user.role_id },
        raw: true,
      });
      console.log(role)
      if (role.slug != "company_admin") {
        console.log(role);
        if (!role.permissions.includes(requiredPermission)) {
          return res.status(httpStatus.status.FORBIDDEN).json({
            message: "Access Denied",
            statusCode: httpStatus.status.FORBIDDEN,
          });
        }
      }

      next();
    } catch (error) {
      return res.status(httpStatus.status.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        statusCode: httpStatus.status.INTERNAL_SERVER_ERROR,
      });
    }
  };
};

module.exports = checkPermission;
