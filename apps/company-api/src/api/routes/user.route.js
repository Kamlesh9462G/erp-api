const express = require("express");
const auth = require("../../middlewares/auth");
const checkPermission = require("@erp-system/common/middlewares/permission");
const { userController } = require("../controllers/index");
const router = express.Router();

router.post("/", auth, checkPermission("add_user"), userController.addUser);
router.get("/", auth, checkPermission("get_users"), userController.getUsers);
router.get("/me", auth, checkPermission("get_me"), userController.getUser);

router.get(
  "/:user_id",
  auth,
  checkPermission("get_user"),
  userController.getUser
);
router.patch(
  "/:user_id",
  auth,
  checkPermission("update_user"),
  userController.updateUser
);
router.delete(
  "/:user_id",
  auth,
  checkPermission("delete_user"),
  userController.deleteUser
);

module.exports = router;
