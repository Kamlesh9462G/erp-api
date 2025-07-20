const express = require('express');
const httpStatus = require('http-status');
const superAdminRoutes = require('./api/routes/index');
const morgan = require('@erp-system/common/config/morgan');
const { errorConverter, errorHandler } = require('@erp-system/common/middlewares/error');
const ApiError = require('@erp-system/common/utils/ApiError');
const securityMiddleware = require('@erp-system/common/middlewares/security');

const app = express();

app.set('trust proxy', true);

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(securityMiddleware);



app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use('/', superAdminRoutes);

app.use((req, res, next) => {
  next(
    new ApiError(
      httpStatus.status.NOT_FOUND,
      `Route ${req.originalUrl} with method ${req.method} not found`,
    ),
  );
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
