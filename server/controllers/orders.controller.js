const express = require("express");
const { Orders, Shop } = require("../models");
const { OrderItem } = require("../models");
const { Products } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getlist,
  createOrders,
  getOrdersById,
  getOrdersByUserUUID,
  updateOrders,
  destroyOrders,
  getOrdersByShopUUID,
  totalSalesbyStatusShipped,
  getCountOrder,
};
//getall
async function getlist(req, res) {
  const result = await Orders.findAll();
  res.json(result);
}
//getbyId

async function getOrdersById(req, res) {
  const _id = req.params.id;
  const result = await Orders.findByPk(_id);
  res.json(result);
}
async function getOrdersByUserUUID(req, res) {
  console.log("enter in getOrdersByUserUUID", req);

  const _user_uid = req.params.id;
  console.log("_user_uid", _user_uid);
  const result = await Orders.findAll({
    where: {
      user_uid: _user_uid,
    },
  });
  console.log("orderResut", result);
  // const shopResult = await Shop.findAll({
  //   where: {
  //     shop_Uuid: _user_uid,
  //   },
  // });
  res.json(result);
}
async function getOrdersByShopUUID(req, res) {
  console.log("enter in getOrdersByUserUUID", req);

  const _shop_uuid = req.params.id;
  console.log("_shop_uuid", _shop_uuid);
  const result = await Orders.findAll({
    where: {
      shop_uuid: _shop_uuid,
    },
  });
  console.log("orderResut", result);

  res.json(result);
}
//Create
async function createOrders(req, res) {
  console.log("Enter in createOrder");
  const reqbody = req.body;
  console.log("reqbody", reqbody);
  console.log("reqbody?.user_uid", reqbody?.user_uid);
  const uniqueOrderUUid = `Order${Date.now() + Date.now()}${Math.round(
    Math.random() * 1e9
  )}`;
  const uniqueOrderItemUUid = `OrderItem${Date.now() + Date.now()}${Math.round(
    Math.random() * 1e9
  )}`;
  let ShopUUID;
  let orderItemsIds = Promise.all(
    reqbody.orderItems?.map(async (eachOrderItem) => {
      console.log("eachOrderItem", eachOrderItem.shop_uuid);
      ShopUUID = eachOrderItem
        ? eachOrderItem.shop_uuid
        : eachOrderItem.product?.item?.shop_uuid;
      let orderItemBox = {
        orderitemUuid: uniqueOrderItemUUid,
        quantity: eachOrderItem.quantity,
        ordered_product_uuid: ShopUUID,
      };
      // console.log("OrderItem__orderItemBox", orderItemBox);
      let newOrderItems = await OrderItem.create(orderItemBox);
      return newOrderItems.orderitemUuid;
    })
  );
  let orderItemsIdsResolved = await orderItemsIds;
  //total price
  let totalPrice;
  try {
    totalPrice = await Promise.all(
      orderItemsIdsResolved?.map(async (orderItemId) => {
        // console.log("map__async__orderItemId", orderItemId);
        // let orderItem_result = await OrderItem.findByPk(orderItemId);
        let __response;
        let __orderedProduct;
        let orderItem_result = await OrderItem.findAll({
          where: { orderitemUuid: orderItemId },
        }).then(async (odrItm) => {
          await odrItm.map((opid) => {
            __response = opid;
          });
        });
        console.log("OrderItem has p_uuid", __response.ordered_product_uuid);

        await Products.findAll({
          where: { productUuid: __response.ordered_product_uuid },
        }).then(async (odrItm) => {
          await odrItm.map((pdata) => {
            __orderedProduct = pdata;
          });
        });

        console.log("__orderedProduct", __response.price);
        let finalTotal = __orderedProduct?.price * __response?.quantity;
        console.log("finalTotal", finalTotal);
        return finalTotal;
      })
    );
    console.log("totalPrice", totalPrice);
  } catch (error) {
    console.log("error", error);
  }
  let grandTotal = totalPrice?.reduce((p1, p2) => p1 + p2, 0);
  console.log("grandTotal", grandTotal);
  let result;
  try {
    if (orderItemsIdsResolved) {
      for (let i = 0; i < orderItemsIdsResolved.length; i++) {
        let eachOrderItemIdResolved = orderItemsIdsResolved[i];
        const order = {
          orderUuid: uniqueOrderUUid,
          orderedItem_uuid: eachOrderItemIdResolved,
          shippingAddress1: reqbody.shippingAddress1,
          shippingAddress2: reqbody.shippingAddress2,
          city: reqbody.city,
          zipcode: reqbody.zipcode,
          country: reqbody.country,
          phone: reqbody.phone,
          status: reqbody.status || "Pending",
          totalPrice: grandTotal || reqbody.totalPrice,
          user_uid: reqbody.user_uid,
          shop_uuid: ShopUUID || reqbody.shop_uuid,
        };
        console.log("server order object", order);
        result = await Orders.create(order);
        if (!result) {
          return res
            .status(500)
            .json({ message: `Order Placed failed`, success: false });
        }
        return res
          .status(200)
          .json({ message: `Order Placed Successfully`, success: true });
      }
    }
  } catch (error) {
    console.log("error", error);
    const respond = {
      message: `Order Placed failed`,
      success: false,
      error: error,
    };
    return res.status(404).json(respond);
  }
}
//Update
async function updateOrders(req, res) {
  let _uuid = req.params.id;
  console.log("req.params", req.params);
  const reqbody = req.body;
  let orderStatus = {
    status: reqbody.status,
  };
  const result = await Orders.update(orderStatus, {
    where: { orderUuid: _uuid },
  });
  if (!result) {
    res
      .status(500)
      .json({ message: `Order status updation failed`, success: false });
  }
  res.status(200).json(result);
}
//destroy
async function destroyOrders(req, res) {
  let _uuid = req.params.id;
  console.log("req.params", req.params);
  try {
    await Orders.destroy({ where: { orderUuid: _uuid } }).then(
      async (order) => {
        if (order) {
          console.log("order", order);
          await order.orderitems.map(async (orderitem) => {
            console.log("orderitem", orderitem);
            await OrderItem.destroy({ where: { id: orderitem } });
          });
          res.status(500).json({
            message: `Order delete failed`,
            success: false,
            status: 500,
          });
        } else {
          res.status(200).json({
            message: `Order Delete Successfully`,
            success: true,
            result: order,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      message: `Error in Order deleting`,
      success: false,
      error: error,
    });
  }
}
async function totalSalesbyStatusShipped(req, res) {
  const totalSales = await Orders.sum("totalPrice", {
    where: { status: "shipped" },
  });

  console.log("totalSales", totalSales);
  if (!totalSales) {
    res
      .status(500)
      .json({ message: ` total Order shipped status failed`, success: false });
  } else {
    res.status(200).json({ totalSales: totalSales });
  }
}
async function getCountOrder(req, res) {
  const OrderCount = await Orders.count(); //({ where: { id: { [Op.gt]: 25 } } });
  if (!OrderCount) {
    res.status(500).json({ success: false });
  }
  res.send({ OrderCount: OrderCount });
}
