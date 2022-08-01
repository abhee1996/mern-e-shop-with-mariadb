const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  getlist,
  register,
  login,
  getUserById,
  getUserByUUId,
  updateUser,
  destroyUser,
};
//getall
async function getlist(req, res) {
  const result = await Users.findAll();
  if (!result) {
    res.status(500);
  }
  res.json(result);
}
//getbyId

async function getUserById(req, res) {
  const _id = req.params.id;
  const result = await Users.findByPk(_id);
  if (!result) {
    res.status(500);
  }
  res.json(result);
}
//getbyUUId

async function getUserByUUId(req, res) {
  const _id = req.params.id;
  const result = await Users.findAll({ where: { user_uid: _id } });
  if (!result) {
    res.status(500);
  }
  res.json(result);
}
//create
async function register(req, res) {
  const reqbody = req.body;
  const uniqueUserUUid = `User${Date.now() + Date.now()}${Math.round(
    Math.random() * 1e9
  )}`;
  try {
    const result = bcrypt.hash(reqbody.password, 10).then(async (hash) => {
      await Users.create({
        name: reqbody?.name,
        username: reqbody?.username,
        email: reqbody?.email,
        password: hash,
        user_uid: uniqueUserUUid,
        phone: reqbody?.phone,
        city: reqbody?.city,
        address: reqbody?.address,
        zipcode: reqbody?.zipcode,
        country: reqbody?.country,
      });
    });
    console.log("result", result);
    if (!result) {
      res
        .status(500)
        .json({ success: false, isRegistered: false, registered: result });
    }
    res.status(200).json({
      success: true,
      isRegistered: true,
      registered: result,
    });
  } catch (error) {
    console.log("error:", error);
  }
}
async function login(req, res) {
  const reqbody = req.body;
  let secret = process.env.secret || "my-app-secrets";
  console.log("secret :", secret);
  try {
    const user = await Users.findOne({
      where: { email: reqbody?.email },
    });
    console.log(" login findOne user", user);
    if (!user) {
      res.json({ error: "User does not exist" });
    } else {
      bcrypt.compare(reqbody?.password, user?.password).then(async (match) => {
        console.log("bcrypt match", match);
        if (!match) {
          res.status(500).json({
            success: false,
            isLoggedIn: match,
            error: "Wrong username and password ",
          });
        } else {
          const token = jwt.sign(
            { userId: user.id, isUser: true, user_uid: user.user_uid },
            secret,
            {
              expiresIn: "1d",
            }
          );
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
//
async function updateUser(req, res) {
  let _id = req.params.id;
  const reqbody = req.body;
  console.log("reqbody", reqbody);
  const result = await Users.update(reqbody, { where: { id: _id } });
  console.log("result", result);
  if (!result) {
    res.status(500).json(result);
  } else {
    res.status(200).json(result);
  }
}

async function destroyUser(req, res) {
  let _id = req.params.id;
  const result = await Users.destroy({ where: { id: _id } });
  if (!result) {
    res.status(500).json(result);
  } else {
    res.status(200).json(result);
  }
}
