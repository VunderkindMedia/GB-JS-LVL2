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
    this.filteredItems = [];
    this.sum = 0;
  }

  getList() {
    const url = `${API_URL}/catalogData.json`
    return fetch(url, {
      method: 'GET'
    }).then(result => {
      return result.json();
    }).then(result => {
      this.items = result;
      console.log(result);
      this.filteredItems = this.items;
      this.render();
    })
  }

  init() {
    document.querySelector('[data-id="search"]').addEventListener('input', event => {
      goodList.searchHandle(event.target.value);
    })

    goodList.getList().then(result => {
      this.render();
    });
  }

  searchHandle = (text) => {
    this.filteredItems = this.items.filter(item => {
      const match = item.product_name.toLowerCase().includes(text.toLowerCase());
      return !!match;
    })
    this.render();
  }

  getAllPrice() {
    return this.sum;
  }

  render() {
    const templateItems = this.filteredItems.map(({id_product, product_name = 'Заголовок отсутствует', price = 0}) => {
      this.sum += price;
      return new GoodItem(product_name, price).render();
    }).join('');
    const wrapper = document.querySelector('.products-list .products-wrapper');
    wrapper.innerHTML = templateItems;
    const itemsHTML = document.querySelectorAll('.product-item__cart-btn');

    itemsHTML.forEach((el) => {

      const title = el.parentNode.querySelector('.product-item__title').innerHTML;
      const price = el.parentNode.querySelector('.product-item__price').innerHTML;
      const loader = el.querySelector('.cssload-container');
      el.addEventListener('click', () => {
        console.log('press');
        if (!el.classList.contains('disabled')) {
          loader.classList.remove('hide');
          cartList.addItem(title,price).then(result => {
            el.querySelector('span').innerHTML = 'Удалить из корзины';
            el.classList.add('disabled');
            loader.classList.add('hide');
          });
        } else {
          console.log('11');
          el.querySelector('span').innerHTML = 'Добавить в корзину';
          cartList.deleteItem({title, price});
          el.classList.remove('disabled');
        }
      })
    })
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
goodList.init();

///Добавление/удаление из корзины

const cartList = new CartList();
cartList.updateCountCartBtn();

