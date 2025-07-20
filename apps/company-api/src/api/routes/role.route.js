const express = require("express");
const auth = require("../../middlewares/auth");
const checkPermission = require("@erp-system/common/middlewares/permission");
const { roleController } = require("../controllers/index");
const router = express.Router();

router.post("/", 
    // auth, checkPermission("add_role"),
     roleController.addRole);
router.get("/",
     auth, checkPermission("get_roles"),
      roleController.getRoles);
router.get("/:role_id", auth, checkPermission("get_role"), roleController.getRole);
router.patch("/:role_id", auth, checkPermission("update_role"), roleController.updateRole);
router.delete("/:role_id", auth, checkPermission("delete_role"), roleController.deleteRole);

module.exports = router;
