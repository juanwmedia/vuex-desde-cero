<template>
  <div>
    <h2>Carrito</h2>
    <hr />
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} ({{ item.quantity }})
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "AppShoppingCart",
  computed: {
    cartItems() {
      return this.$store.getters.productsOnCart;
    }
  }
};
</script>

<style scoped>
ul {
  text-align: left;
}
</style>
