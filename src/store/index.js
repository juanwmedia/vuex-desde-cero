import Vue from "vue";
import Vuex from "vuex";
import shop from "../api/shop.js";
import cart from "./cart.js";
import products from "./products.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    cart,
    products
  },
  state: {
    checkoutError: false
  },
  mutations: {
    setCheckoutError(state, error) {
      state.checkoutError = error;
    }
  },
  actions: {
    checkout({ commit, state }) {
      shop.buyProducts(
        state.cart.cart,
        () => {
          commit("emptyCart");
          commit("setCheckoutError", false);
        },
        () => {
          commit("setCheckoutError", true);
        }
      );
    }
  },
  getters: {}
});
