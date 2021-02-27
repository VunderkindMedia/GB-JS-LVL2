'use strict';

class GoodItem {
  title;
  price;
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `<div class="product-item">
            <div class="product-item__image"><img src="https://picsum.photos/200" alt="image"></div>
            <h3 class="product-item__title">${this.title}</h3>
            <p class="product-item__price">Price: ${this.price} USD</p>
            <div class="product-item__cart-btn cart-button">Добавить в корзину</div>
          </div>`;
  }
}

class GoodsList {
  constructor() {
    this.items = [];
    this.sum = 0;
  }
  getList() {
    const productList = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
    this.items = productList.map(({title = 'Заголовок отсутствует', price = 0}) => {
      this.sum += price;
      return new GoodItem(title, price).render();
    }).join('');
  }

  getAllPrice() {
    return this.sum;
  }

  render() {
    const wrapper = document.querySelector('.products-list .products-wrapper');
    wrapper.innerHTML = this.items;
  }
}

class CartList extends GoodsList {
  constructor() {
    super();
    this.count = 0;
    this.cart_btn = document.querySelector('.cart-button');
  }

  updateCountCartBtn() {
    this.cart_btn.querySelector('p').innerHTML = this.getItemsCount();
  }

  addItem(title, price) {
    this.items.push({title, price});
    this.updateCountCartBtn();
    this.log();
  }

  deleteItem(item) {
    this.items.splice(this.items.indexOf(item));
    this.updateCountCartBtn();
    this.log();
  }

  getItemsCount() {
    this.count = this.items.length;

    return this.count;
  }

  log() {
    console.log(this.items);
  }
}

///Список товаров

const goodList = new GoodsList();
goodList.getList();
goodList.render();

///Добавление/удаление из корзины

const cartList = new CartList();
cartList.updateCountCartBtn();

