const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mysql = require('./mysql');
const jwt = require('./jwt');
const ports = require('./ports');

module.exports = {
  env: process.env.NODE_ENV,
  cryptoKey: process.env.CRYPTO_SERVER_KEY,
  mysql,
  jwt,
  ...ports,
};
