<template>
  <div class="products-list">
    <div class="wrapper products-wrapper">
      <span v-if="filtered_list.length == 0" style="position:absolute; top: 50%; left: 50%">Продукты отсутсвуют</span>
      <ProductItem v-for="item in items"
                   :item="item"
                   :is_cart="is_cart"
                   :add_cart="add_cart"
                   :remove_cart="remove_cart"
                   v-bind:key="item.product_id">
        </ProductItem>
      <div v-if="products_list.length <= 0" class="loader">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem'
export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  props: {
    items: Array,
    is_cart: Function,
    add_cart: Function,
    remove_cart: Function,
    filtered_list: Array,
    products_list: Array
  }
}
</script>
