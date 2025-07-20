const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('@erp-system/common/config');
const { encrypt, decrypt } = require('@erp-system/common/utils/crypto');
const { tokenTypes } = require('@erp-system/common/config/tokens');

/**
 * Generate token
 * @param {ObjectId} user_id
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (user, expires, type, secret = config.jwt.secret) => {
  const payload = {
    user_id: user.id,
    name: user.name,
    department_id: user.department_id,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  const encryptPayload = encrypt(JSON.stringify(payload));
  const encData = { key: encryptPayload };
  return jwt.sign(encData, secret);
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user, refreshTokenExpires, tokenTypes.REFRESH);
  // await saveToken(
  //   refreshToken,
  //   user.id,
  //   refreshTokenExpires,
  //   tokenTypes.REFRESH
  // );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
module.exports = {
  generateAuthTokens,
};
