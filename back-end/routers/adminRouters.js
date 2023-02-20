const router = require("express").Router();
const { adminControllers } = require("../controllers/index");

router.post("/register", adminControllers.register);
router.post("/login", adminControllers.login);
router.get("/keepLogin", adminControllers.keepLogin);

module.exports = router;
