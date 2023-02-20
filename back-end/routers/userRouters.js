const router = require("express").Router();
const { userControllers } = require("../controllers/index");

router.post("/register", userControllers.register);
router.post("/login", userControllers.login);
router.get("/keepLogin", userControllers.keepLogin);
router.get("/allUser", userControllers.findAllUser);

module.exports = router;
