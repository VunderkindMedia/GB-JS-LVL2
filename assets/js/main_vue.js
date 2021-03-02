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
                    <div class="product-item__image"><img src="https://picsum.photos/200" alt="image"></div>
                    <h3 class="product-item__title">{{item.product_name}}</h3>
                    <p class="product-item__price">Price: {{item.price}} USD</p>
                    <div class="product-item__cart-btn cart-button" :class="{disabled: is_cart(item.id_product)}" @click="!is_cart(item.id_product) ? add_cart(item.id_product) : remove_cart(item.id_product)">
                        <span>{{is_cart(item.id_product) ? 'Удалить из корзины' : 'Добавить в корзину'}}</span>
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
      const url = `${API_URL}/catalogData.json`
      return fetch(url, {
        method: 'GET'
      }).then(result => {
        return result.json();
      }).then(result => {
        this.productsList = result;
        this.filteredList = result;
      })
    },
    addCart(id) {
      this.cartList.push(this.filteredList.find(item => item.id_product == id));
      console.log(this.cartList);
    },
    removeCart(id) {
      this.cartList.splice(this.cartList.indexOf(this.cartList.find(item => item.id_product == id)));
      console.log(this.cartList);
    },
    isCart(id) {
      return !!this.cartList.find(item => item.id_product == id);
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
