<template>
  <div>
    <h1>Listado de productos</h1>
    <hr />
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} | {{ product.price }}
        <i>{{ product.inventory }} </i>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../api/shop.js";
export default {
  name: "AppProductList",
  created() {
    api.getProducts(products => {
      // this.products = products;
      this.$store.commit("setProducts", products);
    });
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  }
};
</script>

<style scoped>
ul {
  text-align: left;
}
</style>
