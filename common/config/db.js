const { Sequelize } = require("sequelize");
const config = require("./index");
const logger = require("./logger");

const sequelize = new Sequelize(
  process.env.MYSQL_DB || config.mysql.database,
  process.env.MYSQL_USER || config.mysql.user,
  process.env.MYSQL_PASSWORD || config.mysql.password,
  {
    host: process.env.MYSQL_HOST || config.mysql.host,
    dialect: "mysql",
    logging: false,
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    logger.info("✅ Connected to MySQL.");
  } catch (error) {
    console.error("MySQL connection error:", error);
    process.exit(1);
  }
};

module.exports = sequelize;
module.exports.connect = connect;
