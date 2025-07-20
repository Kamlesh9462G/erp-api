const jwt = require('jsonwebtoken');
const { encrypt, decrypt } = require('@erp-system/common/utils/crypto');
const catchAsync = require('@erp-system/common/utils/catchAsync');
const { CompanyUser } = require('@erp-system/common/models/index');
const auth = catchAsync(async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized: Missing authorization header' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const decryptedPayload = JSON.parse(decrypt(decoded.key));

    const user = await CompanyUser.findOne({
      where: { id: decryptedPayload.user_id },raw:true
    });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.user = decryptedPayload;
    req.token = token;

    return next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    if (error.name === 'JsonWebTokenError' || error.name === 'SyntaxError') {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token has expired' });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = auth;
