const express = require('express');

const productsRouter = require('./products');
const cartRouter = require('./cart');
const indexRouter = express.Router();

indexRouter.get('/', (req, res, next)=> {
  res.send({welcome: 'Это стартовая страница'})
});

module.exports = {
  indexRouter, productsRouter, cartRouter
};
