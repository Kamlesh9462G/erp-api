const app = require("./app");
const config = require("@erp-system/common/config");

const logger = require("@erp-system/common/config/logger");
const { connect: connectMySQL } = require("@erp-system/common/config/db");

let server;

(async () => {
  try {
    await connectMySQL();

    server = app.listen(config.ADMIN_PORT, "0.0.0.0", () => {
      logger.info(`🚀 Listening to port ${config.ADMIN_PORT}`);
    });
  } catch (error) {
    logger.error("❌ Initial connection error:", error);
    process.exit(1);
  }
})();

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("👋 Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error("💥 Unexpected Error:", error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
  logger.info("📴 SIGTERM received");
  if (server) {
    server.close();
  }
});
