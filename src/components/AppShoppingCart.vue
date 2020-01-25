<template>
  <div>
    <h2>Carrito</h2>
    <hr />
    <ul>
      <li v-for="(item, $index) in cartItems" :key="item.id">
        {{ item.title }} ({{ item.quantity }})
        <button @click="removeItem($index)">X</button>
      </li>
    </ul>
    <hr />
    <h4>Total {{ cartTotal || 0 }}</h4>
  </div>
</template>
<script>
import { currency } from "@/utils/currency.js";
export default {
  name: "AppShoppingCart",
  methods: {
    removeItem(index) {
      this.$store.dispatch("removeProductFromCart", index);
    }
  },
  computed: {
    cartItems() {
      return this.$store.getters.productsOnCart;
    },
    cartTotal() {
      return currency(this.$store.getters.cartTotal, " €");
    }
  }
};
</script>

<style scoped>
ul {
  text-align: left;
}
</style>
