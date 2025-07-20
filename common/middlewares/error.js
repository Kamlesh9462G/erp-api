const { ValidationError: SequelizeValidationError } = require('sequelize');
const httpStatus = require('http-status');
const config = require('../config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;

  if (error instanceof SequelizeValidationError) {
    const messages = error.errors.map((e) => e.message).join(', ');
    error = new ApiError(httpStatus.status.BAD_REQUEST, messages, true, err.stack);
  }

  else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.status.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  const isDev = config.env === 'development';
  const isProd = config.env === 'production';

  logger.error(err);

  if (isProd && !err.isOperational) {
    statusCode = httpStatus.status.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.status.INTERNAL_SERVER_ERROR];
  }

  const response = {
    message,
    data: [],
    ...(isDev && { stack: err.stack }), 
  };

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
