const express = require("express");
const router = express.Router();
const Ordercontroller = require("../controllers/orders.controller");

router.get("/allorders", Ordercontroller.getlist);
router.get("/orderdetail/:id", Ordercontroller.getOrdersById);
router.get("/orderdetailby/userid/:id", Ordercontroller.getOrdersByUserUUID);
router.get("/orderdetailby/shop/:id", Ordercontroller.getOrdersByShopUUID);
router.post("/new", Ordercontroller.createOrders);
router.put("/put/:id", Ordercontroller.updateOrders);
router.delete("/delete/:id", Ordercontroller.destroyOrders);
router.get("/count/", Ordercontroller.getCountOrder);
router.get(
  "/totalsales/status/shipped",
  Ordercontroller.totalSalesbyStatusShipped
);

module.exports = router;
