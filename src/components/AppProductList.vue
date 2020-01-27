<template>
  <div>
    <h2>Listado de productos</h2>
    <hr />
    <ul>
      <li
        :class="{ 'sold-out': $store.getters.nearlySoldOut(product.id) }"
        @click="selectProduct(product)"
        v-for="product in productsOnStock"
        :key="product.id"
      >
        {{ product.title }} | {{ product.price }}
        <i>{{ product.inventory }} </i>
        <button @click="addToCart(product)">Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "AppProductList",
  async created() {
    try {
      await this.$store.dispatch("getProducts");
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    ...mapActions({
      addToCart: "addProductToCart"
    }),
    ...mapMutations({
      selectProduct: "setSelectedProduct"
    })
  },
  // methods: {
  //   addToCart(product) {
  //     this.$store.dispatch("addProductToCart", product);
  //   },
  //   selectProduct(product) {
  //     this.$store.commit("setSelectedProduct", product);
  //   }
  // },
  // computed: {
  //   products() {
  //     // return this.$store.state.products;
  //     return this.$store.getters.productsOnStock;
  //   }
  // }
  computed: {
    ...mapState(["selectedProduct"]),
    ...mapGetters(["productsOnStock"]),
    testing() {
      return null;
    }
  }
};
</script>

<style scoped>
ul {
  text-align: left;
}
.sold-out {
  background-color: lightpink;
  border: 3px solid tomato;
  padding: 0.3rem;
  margin: 0.1rem;
}
</style>
