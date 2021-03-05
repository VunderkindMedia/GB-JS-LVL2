const {
  productCreate, productRemove, productsGet, productGet
} = require('./products');

const {
  addItem, removeItem, getList
} = require('./cart');

module.exports = {
  productCreate, productRemove, productsGet, productGet,
  addItem, removeItem, getList
}
