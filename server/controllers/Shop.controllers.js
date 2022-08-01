const express = require("express");
const router = express.Router();
const { Shop } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  getlist,
  createShop,
  shoplogin,
  getShopById,
  updateShop,
  destroyShop,
  getShopByShopUUId,
};
//getall
async function getlist(req, res) {
  const result = await Shop.findAll();
  res.json(result);
}
//getbyId

async function getShopById(req, res) {
  const _id = req.params.id;
  const result = await Shop.findByPk(_id);
  res.json(result);
}
//getbyId

async function getShopByShopUUId(req, res) {
  const _id = req.params.id;
  console.log("_id", _id);
  const result = await Shop.findAll({ where: { shopUuid: _id } });
  res.json(result);
}
//shoplogin
async function shoplogin(req, res) {
  const reqbody = req.body;
  let secret = process.env.secret || "my-app-secrets";
  console.log("secret :", secret);
  try {
    const shop = await Shop.findOne({
      where: { email: reqbody?.email },
    });
    if (!shop) {
      res.json({ error: "shop does not exist" });
    } else {
      bcrypt.compare(reqbody?.password, shop?.password).then(async (match) => {
        console.log("shop password bcrypt match", match);
        if (!match) {
          res.status(500).json({
            success: false,
            isLoggedIn: match,
            error: "Wrong shop name and password ",
          });
        } else {
          const token = jwt.sign(
            {
              shopId: shop.id,
              shop_uuid: shop.shopUuid,
              shopArr: shop,
              isShop: true,
            },
            secret,
            {
              expiresIn: "4d",
            }
          );
          console.log("shoptoken", token);
          res.status(200).json({
            success: true,
            isloggedIn: match,
            message: "Authentication successfull",
            token: token,
          });
        }
      });
    }
  } catch (error) {
    console.log("error:", error);
  }
}
//Create
async function createShop(req, res) {
  const reqbody = req.body;
  const uniqueShopUUid = `Shop${Date.now() + Date.now()}${Math.round(
    Math.random() * 1e9
  )}`;
  console.log("createShop reqbody", reqbody);
  console.log("reqbody?.number", reqbody?.number);
  try {
    const result = bcrypt.hash(reqbody.password, 10).then(async (hash) => {
      await Shop.create({
        name: reqbody?.name,
        owner: reqbody?.owner,
        email: reqbody?.email,
        shopUuid: uniqueShopUUid,
        password: hash,
        number: reqbody?.number,
      });
    });
    console.log("result", result);
    if (!result) {
      res
        .status(500)
        .json({ success: false, isShopRegistered: false, registered: result });
    }
    res.status(200).json({
      success: true,
      isShopRegistered: true,
      registered: result,
    });
  } catch (error) {
    console.log("error:", error);
  }
}
// async function createShop(req, res) {
//   const reqbody = req.body;
//   await Shop.create(reqbody);
//   res.json(reqbody);
// }
async function updateShop(req, res) {
  let _id = req.params.id;
  const reqbody = req.body;
  console.log("reqbody", reqbody);
  const result = await Shop.update(reqbody, { where: { id: _id } });
  console.log("result", result);
  res.json(result);
}

async function destroyShop(req, res) {
  let _id = req.params.id;
  const result = await Shop.destroy({ where: { id: _id } });
  res.json(result);
  res.send(`deleted data successfully`);
}
