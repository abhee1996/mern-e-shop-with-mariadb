const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/users.controller");

router.get("/allUsers/", UserControllers.getlist);
router.get("/userprofile/:id", UserControllers.getUserById);
router.get("/userdetail/user_uid/:id", UserControllers.getUserByUUId);
router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);
router.put("/userdetail/update/:id", UserControllers.updateUser);
router.delete("/userdetail/delete/:id", UserControllers.destroyUser);

module.exports = router;
