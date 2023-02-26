const router = require("express").Router();
const { transactionControllers } = require("../controllers/index");

router.post("/create", transactionControllers.create);
router.patch("/updateQty/:id", transactionControllers.updateQty);
router.delete("/remove/:id", transactionControllers.delete);

module.exports = router;
