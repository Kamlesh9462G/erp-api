const express = require("express");
const router = express.Router();

const authRoute = require("./auth.route");
const roleRoute = require("./role.route");
const userRoute = require("./user.route");
const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/roles",
    route: roleRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
];

routes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
