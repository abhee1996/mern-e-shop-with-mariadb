const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { previousDataValues } = require("../controllers/posts.controller");

module.exports = {
  getlist,
  createComment,
  getCommentsById,
  updateComment,
  destroyComment,
};
//getall
async function getlist(req, res) {
  const postId = req.params.postId || previousDataValues;

  const result = await Comments.findAll({ where: { PostId: postId } });
  res.json(result);
}
//getbyId

async function getCommentsById(req, res) {
  const _id = req.params.id;
  const result = await Comments.findByPk(_id);

  res.json(result);
}
//Create
async function createComment(req, res) {
  const Comment = req.body;
  await Comments.create(Comment);
  res.json(Comment);
}
async function updateComment(req, res) {
  let _id = req.params.id;
  const reqbody = req.body;
  const result = await Comments.update(reqbody, { where: { id: _id } });
  res.json(result);
  res.send(`update data Successfully`);
}

async function destroyComment(req, res) {
  let _id = req.params.id;
  const Comment = req.body;
  const result = await Comments.destroy({ where: { id: _id } });
  res.json(result);
  res.send(`deleted data successfully`);
}
// router.get("/", async (req, res) => {
//   const listOfComments = await Comments.findAll();
//   res.json(listOfComments);
// });
// router.Comment("/", async (req, res) => {
//   const Comment = req.body;
//   await Comments.create(Comment);
//   res.json(Comment);
// });

// module.exports = router;
