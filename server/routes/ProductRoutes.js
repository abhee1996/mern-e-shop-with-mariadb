const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers");
const {
  createProduct,
  destroyProduct,
  getCountProduct,
  getProductById,
  getfeaturedProduct,
  getlist,
  updateProduct,
  getProductImages,
  getProductByShopUUID,

  uploadOptions,
} = productControllers;

let upOpts = uploadOptions;

router.get("/getall/", getlist);
router.get("/getallProductBy/shopuuid/:id", getProductByShopUUID);
router.get("/productdetail/:id", getProductById);
router.get("/getproductImages/:id", getProductImages);
router.get("/get/featured/:count", getfeaturedProduct);
router.get("/get/count", getCountProduct);
router.post("/new", upOpts.array("images", 10), createProduct);
// router.post("/new", upOpts.single("image"), createProduct);
router.put("/update/:id", upOpts.array("images", 10), updateProduct);

router.delete("/delete/:id", destroyProduct);

module.exports = router;

// router.post(
//   "/update/gallery-images/:id",
//   upOpts.array("images", 10),
//   productImages
// );
// router.post("/new/gallery-images/", upOpts.array("images", 10), productImages);
