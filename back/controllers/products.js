const { getProducts, getProduct, addProduct, removeProduct } = require('../models');

const productCreate = async (req, res, next) => {
  const item = req.body;
  if (addProduct(item)) {
    res.send({ result: 'Товар добавлен'})
  } else {
    res.send({ error: 'Произошла ошибка'})
  }
};

const productGet = async (req, res, next) => {
  const body = req.query;
  res.send({ product: getProduct(body.product_id)})
}

const productsGet = async (req, res, next) => {
  res.send({ products: getProducts()})
}

const productRemove = async (req, res, next) => {
  const body = req.query;
  const remove = removeProduct(body.product_id);
  console.log(remove);
  if (remove == 0) {
    res.send({ error: 'Продукт с таким ID не найден!'});
  } else {
    res.send({ result: 'Продукт удален'});
  }
}

module.exports = {
  productGet, productsGet, productCreate, productRemove
};
