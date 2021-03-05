const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

Vue.component('app-product-list', {
  props: {
    items: Array,
    is_cart: Function,
    add_cart: Function,
    remove_cart: Function,
    filtered_list: Array,
    products_list: Array
  },
  template: `
    <div class="products-list">
      <div class="wrapper products-wrapper">
        <span v-if="filtered_list.length == 0" style="position:absolute; top: 50%; left: 50%">Продукты отсутсвуют</span>
            <app-product-item v-for="item in items" :item="item" :is_cart="is_cart" :add_cart="add_cart" :remove_cart="remove_cart"></app-product-item>
        <div v-if="products_list.length <= 0" class="loader">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
      </div>
    </div>`
});

Vue.component('app-product-item', {
  props: {
    item: Object,
    is_cart: Function,
    add_cart: Function,
    remove_cart: Function
  },
  template: `
                <div class="product-item" >
                    <div class="product-item__image"><img :src="item.product_image" alt="image"></div>
                    <h3 class="product-item__title">{{item.product_name}}</h3>
                    <p class="product-item__price">Price: {{item.price}} USD</p>
                    <div class="product-item__cart-btn cart-button" :class="{disabled: is_cart(item.product_id)}" @click="!is_cart(item.product_id) ? add_cart(item.product_id) : remove_cart(item.product_id)">
                        <span>{{is_cart(item.product_id) ? 'Удалить из корзины' : 'Добавить в корзину'}}</span>
                        <div class="cssload-container hide">
                            <ul class="cssload-flex-container">
                                <li>
                                    <span class="cssload-loading"></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`
})

Vue.component('app-cart-button', {
  props: {
    open_close_cart: Function,
    cart_list: Array
  },
  template: `
  <div @click="open_close_cart" class="cart-button" type="button">Корзина - {{cart_list.length}}<p></p></div>`
})

Vue.component('app-search-input', {
  props: {
    search_value: String,
    search_items: Function
  },
  template: `
  <input @input="search_items" class="header-search" placeholder="Найти товары" @value="search_value" />`
})

const app = new Vue({
  el: '#root',
  data: {
    productsList: [],
    filteredList: [],
    cartList: [],
    searchValue: '',
    error: '',
    cartIsClosed: true
  },
  methods: {
    getList() {
      const url = `http://localhost:3001/products/getAll`
      return fetch(url, {
        method: 'GET'
      }).then(result => {
        return result.json();
      }).then(result => {
        this.productsList = result.products;
        this.filteredList = result.products;
      })
    },
    addCart(id) {
        const url = `http://localhost:3001/cart/add?product_id=${id}`
        return fetch(url, {
          method: 'GET'
        }).then(result => {
          return result.json();
        }).then(result => {
          this.cartList = result.cartList;
        })
    },
    removeCart(id) {
      console.log(id);
      const url = `http://localhost:3001/cart/remove?product_id=${id}`
      return fetch(url, {
        method: 'GET'
      }).then(result => {
        return result.json();
      }).then(result => {
        this.cartList = result.cartList;
      })
    },
    isCart(id) {
      return !!this.cartList.find(item => item.product_id == id);
    },
    _searchHandle(text) {
      this.filteredList = this.productsList.filter(item => {
        const match = item.product_name.toLowerCase().includes(text.toLowerCase());
        return !!match;
      })
    },
    searchItems(event) {
      this._searchHandle(event.target.value);
    },
    openCloseCart() {
      this.cartIsClosed = !this.cartIsClosed;
    }

  },

  mounted() {
    this.getList();
  }
})
