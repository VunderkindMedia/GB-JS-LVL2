<template>
  <input @input="search_items" class="header-search" placeholder="Найти товары" @value="search_value" />
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    search_value: String,
    search_items: Function
  }
}
</script>
