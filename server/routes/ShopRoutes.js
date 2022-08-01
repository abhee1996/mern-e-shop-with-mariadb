const express = require("express");
const router = express.Router();
const Shopcontroller = require("../controllers/Shop.controllers");

router.get("/allshops", Shopcontroller.getlist);
router.get("/shopdetail/:id", Shopcontroller.getShopById);
router.get("/shopdetail/shopuuid/:id", Shopcontroller.getShopByShopUUId);
router.post("/auth/new", Shopcontroller.createShop);
router.post("/auth/shoplogin", Shopcontroller.shoplogin);

router.put("/put/:id", Shopcontroller.updateShop);
router.delete("/delete/:id", Shopcontroller.destroyShop);

module.exports = router;
