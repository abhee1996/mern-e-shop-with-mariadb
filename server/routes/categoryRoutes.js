const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/Category.controllers");
const { Category } = require("../models");

router.get("/allcategories", categoryController.getlist);
router.get(
  "/getallcategoriesBy/productcategoryId/:id",
  categoryController.getCategoriesByProductCategoryId
);
// async (req, res)=> {
//     const result = await Category.
//     res.json(result);
//   });

router.get("/Categorydetail/:id", categoryController.getCategoryById);
router.post("/new", categoryController.createCategory);
router.put("/put/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.destroyCategory);

module.exports = router;
