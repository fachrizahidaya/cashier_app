const router = require("express").Router();
const { itemControllers } = require("../controllers/index");
const { multerUpload } = require("../middleware/multer");

router.post("/category", itemControllers.addCategory);
router.post("/product", itemControllers.create);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  itemControllers.itemPic
);
router.patch("/edit/:id", itemControllers.updateProduct);
router.patch("/editCategory/:id", itemControllers.updateCategory);
router.delete("/remove/:id", itemControllers.remove);
router.delete("/removeCategory/:id", itemControllers.removeCategory);
router.get("/pagination", itemControllers.paginationProduct);
router.get("/product", itemControllers.findAll);
router.get("/category", itemControllers.findCategory);
router.get("/byCategory/:id", itemControllers.findByCategory);

module.exports = router;
