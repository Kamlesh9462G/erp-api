const compression = require("compression");
const cors = require("cors");
const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (req, res, next) => {
  const sanitizeStrings = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = sanitizeHtml(obj[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitizeStrings(obj[key]);
      }
    }
  };

  if (req.body) {
    sanitizeStrings(req.body);
  }

  if (req.query) {
    sanitizeStrings(req.query);
  }

  if (req.params) {
    sanitizeStrings(req.params);
  }

  next();
};

const corsOptions = {
  credentials: true,
  exposedHeaders: [
    "Set-Cookie",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
  ],
  origin: [],
};

const securityMiddleware = [
  compression(),
  // cors(corsOptions),
  sanitizeInput,
];

module.exports = securityMiddleware;
