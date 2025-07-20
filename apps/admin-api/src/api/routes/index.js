const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const companyRoute = require("./company.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/company",
    route: companyRoute,
  },
];

routes.forEach(({ path, route }) => {
  if (route && typeof route === 'function') {
    router.use(path, route);
  } else {
    console.warn(`Invalid route for path ${path}`);
  }
});


module.exports = router;
