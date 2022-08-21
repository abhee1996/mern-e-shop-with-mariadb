const express = require("express");
const router = express.Router();
const conversationController = require("../controllers/conversation.controller");

router.get("/getchat/:uuid", conversationController.getChat);
router.get(
  "/getAllShopConversations/:uuid",
  conversationController.getConversationsByShopId
);
router.get(
  "/getAllUserConversations/:uuid",
  conversationController.getConversationsByUserId
);
router.get(
  "/getMessagesStatus/is_seen/:uuid",
  conversationController.getConversationsById
);
router.post(
  "/newmessage/sendMessage",
  conversationController.createConversation
);
router.post(
  "/newmessage/firebase/messaging",
  conversationController.createFireStoreConversation
);
router.get(
  "/get/firebase/message/:uuid",
  conversationController.getFireStoreConversationsByUserUuid
);
router.get(
  "/get/firebase/message/shop/:uuid",
  conversationController.getFireStoreConversationsByShopUuid
);
router.put("/updateMessage/:id", conversationController.updateConversation);
router.delete(
  "/deleteMessages/:id/receiver",
  conversationController.destroyConversation
);
router.delete(
  "/deleteMessages/:id/sender",
  conversationController.destroyConversation
);

module.exports = router;
