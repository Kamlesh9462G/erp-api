module.exports = (res, { statusCode, success = true, message, data }) => {
  res.status(statusCode).json({
    statusCode,
    success,
    message,
    data,
  });
};
