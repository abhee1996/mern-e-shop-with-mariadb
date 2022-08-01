const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const commentController = require("../controllers/comment.controller");

router.get("/getlist/:postId", commentController.getlist);
router.get("/getdetail/:id", commentController.getCommentsById);
router.post("/newcomment/:postId", commentController.createComment);
router.put("/put/:id", commentController.updateComment);
router.delete("/delete/:id", commentController.destroyComment);

module.exports = router;
