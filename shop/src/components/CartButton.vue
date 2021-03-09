<template>
  <div @click="open_close_cart" class="cart-button" type="button">Корзина - {{cart_list.length}}<p></p></div>
</template>

<script>
export default {
  name: 'CartButton',
  props: {
    open_close_cart: Function,
    cart_list: Array
  }
}
</script>
