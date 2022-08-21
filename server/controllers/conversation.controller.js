const express = require("express");
const router = express.Router();
const {
  Conversations,
  ConversationsMessages,
  FireStoreChatRoom,
} = require("../models");
// const { previousDataValues } = require("../controllers/posts.controller");

module.exports = {
  getChat,
  createConversation,
  getConversationsById,
  getConversationsByUserId,
  getConversationsByShopId,
  updateConversation,
  destroyConversation,

  createFireStoreConversation,
  getFireStoreConversationsByUserUuid,
  getFireStoreConversationsByShopUuid,
};
//getall
async function getChat(req, res) {
  const conv_uuid = req.params.conversation_uuid;

  const result = await Conversations.findAll({
    where: { conversation_uuid: conv_uuid },
  });
  res.json(result);
}
//getbyId

async function getConversationsById(req, res) {
  const _id = req.params.id;
  const result = await Conversations.findByPk(_id);

  res.json(result);
}
//getConversationsByShopId
async function getConversationsByShopId(req, res) {
  const _id = req.params.id;
  const result = await Conversations.findAll({
    where: { receiver_uuid: _id },
  });
  res.json(result);
}
////getConversationsByUserId
async function getConversationsByUserId(req, res) {
  const _id = req.params.id;
  const result = await Conversations.findAll({
    where: { sender_uuid: _id },
  });

  res.json(result);
}
//Create
async function createConversation(req, res) {
  const _conversation = req.body;
  await Conversations.create(_conversation);
  res.json(_conversation);
}
async function createFireStoreConversation(req, res) {
  const _conversation = req.body;
  console.log("_conversation", _conversation);
  const result = await FireStoreChatRoom.create(_conversation);
  console.log("createFireStoreConversation result", result);
  res.json(_conversation);
}
async function getFireStoreConversationsByUserUuid(req, res) {
  const _uuid = req.params.uuid;
  console.log("req.params", req.params);
  console.log("getFireStoreConversationsByUserUuid ---_uuid", _uuid);
  const result = await FireStoreChatRoom.findAll({
    where: { sender_uuid: _uuid },
  });
  console.log("getFireStoreConversationsByUserUuid result", result);
  res.json(result);
}
async function getFireStoreConversationsByShopUuid(req, res) {
  const _uuid = req.params.uuid;
  console.log("req.params", req.params);
  console.log("getFireStoreConversationsByUserUuid ---_uuid", _uuid);
  const result = await FireStoreChatRoom.findAll({
    where: { receiver_uuid: _uuid },
  });

  console.log("getFireStoreConversationsByShopUuid result", result);
  res.json(result);
}
async function updateConversation(req, res) {
  let _id = req.params.id;
  const reqbody = req.body;
  const result = await Conversations.update(reqbody, { where: { id: _id } });
  res.json(result);
}

async function destroyConversation(req, res) {
  let _id = req.params.id;
  const conversation = req.body;
  const result = await Conversations.destroy({ where: { id: _id } });
  res.json(result);
  //res.send(`deleted data successfully`);
}
// router.get("/", async (req, res) => {
//   const listOfConversations = await Conversations.findAll();
//   res.json(listOfConversations);
// });
// router.Conversation("/", async (req, res) => {
//   const Conversation = req.body;
//   await Conversations.create(Conversation);
//   res.json(Conversation);
// });

// module.exports = router;
