const express = require('express');
const {
  productCreate, productRemove, productsGet, productGet
} = require('../controllers');

const productsRouter = express.Router();

productsRouter.get('/add', productCreate);
productsRouter.get('/get', productGet);
productsRouter.get('/getAll', productsGet);
productsRouter.get('/remove', productRemove);



module.exports = productsRouter;
