const router = require("express").Router();
const { transactionControllers } = require("../controllers/index");

router.post("/create", transactionControllers.create);
router.patch("/updateQty/:id", transactionControllers.updateQty);
router.get("/findCheckout/:id", transactionControllers.findCheckoutByUser);
router.get("/findBy/:id", transactionControllers.findCartByUser);
router.get("/findTotal/:id", transactionControllers.findTotalByUser);
router.delete("/remove/:id", transactionControllers.delete);

module.exports = router;
