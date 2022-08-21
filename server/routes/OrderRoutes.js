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
//shop owner update order status against user_uid and orderUuid
router.put(
  "/trackOrder/shipping/status/order_uuid/:orderUuid/user/:user_uid",
  Ordercontroller.updateOrderStatusbyUserUuid
);
//user update order  status against shop_uid and orderUuid
router.put(
  "/trackOrder/shipping/status/order_uuid/:orderUuid/shop/:shop_uuid",
  Ordercontroller.updateOrderStatusbyShopUuid
);
module.exports = router;
