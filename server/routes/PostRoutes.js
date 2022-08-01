const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const Postcontroller = require("../controllers/posts.controller");

router.get("/getlist", Postcontroller.getlist);
router.get("/getdetail/:id", Postcontroller.getPostsById);
router.post("/new", Postcontroller.createPost);
router.put("/put/:id", Postcontroller.updatePost);
router.delete("/delete/:id", Postcontroller.destroyPost);

module.exports = router;
//   const listOfPosts = await Posts.findAll();
//   res.json(listOfPosts);
// });

// router.post("/", async (req, res) => {
//   const post = req.body;
//   await Posts.
//   res.json(post);
// });
