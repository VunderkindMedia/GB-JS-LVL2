const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

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
