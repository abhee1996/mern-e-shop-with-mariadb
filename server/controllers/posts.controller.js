const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
let previousDataValues;

module.exports = {
  getlist,
  createPost,
  getPostsById,
  updatePost,
  destroyPost,
  previousDataValues,
};

//getall
async function getlist(req, res) {
  const result = await Posts.findAll();
  res.json(result);
}
//getbyId
// const postingId = () => previousDataValues;
async function getPostsById(req, res) {
  const _id = req.params.id;
  const result = await Posts.findByPk(_id);
  previousDataValues = result?._previousDataValues?.id;
  console.log("result", result?._previousDataValues?.id);
  res.json(result);
}
//Create
async function createPost(req, res) {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
}
async function updatePost(req, res) {
  let _id = req.params.id;
  const post = req.body;
  console.log("post", post);
  const result = await Posts.update(post, { where: { id: _id } });
  console.log("result", result);
  res.json(result);
  res.send(`update data Successfully`);
}

async function destroyPost(req, res) {
  let _id = req.params.id;
  const post = req.body;
  const result = await Posts.destroy({ where: { id: _id } });
  res.json(result);
  res.send(`deleted data successfully`);
}
// router.get("/", async (req, res) => {
//   const listOfPosts = await Posts.findAll();
//   res.json(listOfPosts);
// });
// router.post("/", async (req, res) => {
//   const post = req.body;
//   await Posts.create(post);
//   res.json(post);
// });

// module.exports = router;
