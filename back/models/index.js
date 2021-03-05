const {getProduct, getProducts, addProduct, removeProduct } = require('./products');
const { getCartList, addCartItem, removeCartItem } = require('./cart');

module.exports = {
  getProduct, getProducts, addProduct, removeProduct,
  getCartList, addCartItem, removeCartItem
};
