'use strict';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

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
              <div class="product-item__cart-btn cart-button">
              <span>Добавить в корзину</span>
                <div class="cssload-container hide">
                  <ul class="cssload-flex-container">
                    <li>
                      <span class="cssload-loading"></span>
                    </li>
                  </ul>
                </div>
              </div>
           </div>
          </div>`;
  }
}

class GoodsList {
  constructor() {
    this.items = [];
    this.sum = 0;
  }
  getList() {

    const url = `${API_URL}/catalogData.json`
    return fetch(url, {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(result => {
      console.log(result);
      this.items = result.map(({id_product, product_name = 'Заголовок отсутствует', price = 0}) => {
        this.sum += price;
        return new GoodItem(product_name, price).render();
      }).join('');
      this.render();
    })
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

  addItem(element, title, price) {
    const url = `${API_URL}/addToBasket.json`
    return fetch(url, {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(result => {
      this.items.push({title, price});
      this.updateCountCartBtn();
      return result
    })

  }

  deleteItem(item) {
    this.items.splice(this.items.indexOf(item));
    this.updateCountCartBtn();
  }

  getItemsCount() {
    this.count = this.items.length;

    return this.count;
  }
}

///Список товаров

const goodList = new GoodsList();

///Добавление/удаление из корзины

const cartList = new CartList();
cartList.updateCountCartBtn();

