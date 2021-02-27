'use strict';

const productList = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title, price) => {
  return `<div class="product-item">
            <div class="product-item__image"><img src="https://picsum.photos/200" alt="image"></div>
            <h3 class="product-item__title">${title}</h3>
            <p class="product-item__price">Price: ${price} USD</p>
            <div class="product-item__cart-btn cart-button">Добавить в корзину</div>
          </div>`;
};

const renderGoodsList = (list) => {
  let goodsList = list.map(({title = 'Продукт отсутствует', price = 0}) => renderGoodsItem(title, price)).join('');
  document.querySelector('.products-list .products-wrapper').innerHTML = goodsList;
}

renderGoodsList(productList);
