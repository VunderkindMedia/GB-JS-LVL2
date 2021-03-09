<template>
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
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  props: {
    item: Object,
    is_cart: Function,
    add_cart: Function,
    remove_cart: Function
  }
}
</script>
