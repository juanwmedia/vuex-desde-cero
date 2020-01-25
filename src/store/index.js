import Vue from "vue";
import Vuex from "vuex";
import api from "../api/shop.js";
import shop from "../api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutError: false
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    incrementProductQuantity(state, item) {
      item.quantity++;
    },
    addProductToCart(state, product) {
      state.cart.push({
        id: product.id,
        quantity: 1
      });
    },
    removeProductFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    decrementProductInventory(state, product) {
      product.inventory--;
    },
    incrementProductInventory(state, item) {
      const product = state.products.find(product => product.id === item.id);
      product.inventory += item.quantity;
    },
    emptyCart(state) {
      state.cart = [];
    },
    setCheckoutError(state, error) {
      state.checkoutError = error;
    }
  },
  actions: {
    getProducts({ commit }) {
      return new Promise(resolve => {
        api.getProducts(products => {
          commit("setProducts", products);
          resolve();
        });
      });
    },
    addProductToCart(context, product) {
      // ¿Hay inventario de ese producto?
      if (product.inventory === 0) return;

      // ¿Existe ya en el carrito?
      const item = context.state.cart.find(item => item.id === product.id);

      if (item) {
        // Si es así, añadir uno más a la compra
        context.commit("incrementProductQuantity", item);
      } else {
        // Si no es así, añadir el producto al carrito
        context.commit("addProductToCart", product);
      }

      // Independientemente, restar al inventario de ese producto
      context.commit("decrementProductInventory", product);
    },
    removeProductFromCart(context, index) {
      const item = context.state.cart[index];

      // Eliminar el producto del carrito
      context.commit("removeProductFromCart", index);

      // Restaurar el inventario
      context.commit("incrementProductInventory", item);
    },
    checkout({ commit, state }) {
      shop.buyProducts(
        state.cart,
        () => {
          // Vaciar el carrito
          commit("emptyCart");

          // Establecer que no hay errores
          commit("setCheckoutError", false);
        },
        () => {
          // Establerce que hay errores
          commit("setCheckoutError", true);
        }
      );
    }
  },
  getters: {
    productsOnStock(state) {
      return state.products.filter(product => {
        return product.inventory > 0;
      });
    },
    productsOnCart(state) {
      return state.cart.map(item => {
        const product = state.products.find(product => product.id === item.id);
        return {
          title: product.title,
          price: product.price,
          quantity: item.quantity
        };
      });
    },
    cartTotal(state, getters) {
      return getters.productsOnCart.reduce(
        (total, current) => total + current.price * current.quantity,
        0
      );
    }
  },
  modules: {}
});
