const { addCartItem, removeCartItem, getCartList, getProduct } = require('../models');

const addItem = async (req, res, next) => {
  const id = req.query.product_id;
  const item = getProduct(id);

  if (addCartItem(item)) {
    res.send({ cartList: getCartList()})
  } else {
    res.send({ error: 'Произошла ошибка'})
  }
};

const getList = async (req, res, next) => {
  res.send({ cartList: getCartList()})
}

const removeItem = async (req, res, next) => {
  const id = req.query.product_id;
  const remove = removeCartItem(id);
  console.log(remove);
  if (remove == 0) {
    res.send({ error: 'Продукт с таким ID не найден!'});
  } else {
    res.send({ cartList: getCartList()});
  }
}

module.exports = {
  addItem, removeItem, getList
};
