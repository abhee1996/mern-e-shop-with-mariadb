const express = require("express");
const { Category } = require("../models");

module.exports = {
  getlist,
  createCategory,
  getCategoryById,
  updateCategory,
  destroyCategory,
  getCategoriesByProductCategoryId,
};
//getall
async function getlist(req, res) {
  const result = await Category.findAll();
  res.json(result);
}
//getbyId

async function getCategoryById(req, res) {
  const _id = req.params.id;
  const result = await Category.findByPk(_id);
  res.json(result);
}
async function getCategoriesByProductCategoryId(req, res) {
  const _id = req.params.id;
  const result = await Category.findAll({ where: { id: _id } });
  res.json(result);
}
//Create
async function createCategory(req, res) {
  const reqbody = req.body;
  await Category.create(reqbody);
  res.json(reqbody);
}
async function updateCategory(req, res) {
  let _id = req.params.id;
  const reqbody = req.body;
  console.log("reqbody", reqbody);
  const result = await Category.update(reqbody, { where: { id: _id } });
  console.log("result", result);
  res.json(result);
  // res.send(`update data Successfully`);
}

async function destroyCategory(req, res) {
  let _id = req.params.id;
  const result = await Category.destroy({ where: { id: _id } });
  res.json(result);
}
