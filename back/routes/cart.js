const express = require('express');
const {
  addItem, removeItem, getList
} = require('../controllers');

const cartRouter = express.Router();

cartRouter.get('/add', addItem);
cartRouter.get('/getAll', getList);
cartRouter.get('/remove', removeItem);



module.exports = cartRouter;
