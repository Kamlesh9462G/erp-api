const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/db");

class CompanyUserRole extends Model {}

CompanyUserRole.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permissions: {
      type: DataTypes.TEXT, 
      allowNull: true,
      get() {
        const value = this.getDataValue("permissions");
        return value ? value.split(",") : [];
      },
      set(value) {
        this.setDataValue(
          "permissions",
          Array.isArray(value) ? value.join(",") : value
        );
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "CompanyUserRole",
    tableName: "company_user_roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = CompanyUserRole;
