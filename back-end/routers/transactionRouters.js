const router = require("express").Router();
const { transactionControllers } = require("../controllers/index");

router.post("/create", transactionControllers.create);
router.post("/createOrder/:id", transactionControllers.createOrder);
router.post("/findProduct", transactionControllers.findProductByOrder);
router.patch("/updateQty/:id", transactionControllers.updateQty);
router.get("/findAll", transactionControllers.findAllOrder);
router.get("/findTotal", transactionControllers.findTotalByDate);
router.get("/findCheckout/:id", transactionControllers.findCheckoutByUser);
router.get("/findBy/:id", transactionControllers.findCartByUser);
router.get("/findTotal/:id", transactionControllers.findTotalByUser);
router.get("/findOrder/:id", transactionControllers.findOrderByUser);
router.get("/byRange", transactionControllers.transactionRange)
router.delete("/remove/:id", transactionControllers.delete);

module.exports = router;
