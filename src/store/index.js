import Vue from "vue";
import Vuex from "vuex";
import api from "../api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
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
    }
  },
  modules: {}
});
