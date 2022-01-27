import Vue from "vue";
import Vuex from "vuex";
import api from "../api/shop.js";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [] // Unica fuente de datos verdadera
  },
  mutations: {
    addProducts(state, product) { // Mutamos el state, agregar producto
      state.products = product
    }
  },
  actions: {
    getProducts({ commit }) { // Mediante la accion getProducts
      return new Promise(resolve => { //  realizamos el commit
        api.getProducts(products => { //  de forma async
          commit("addProducts", products);
          resolve();
        });
      });
    }
  },
  getters: {
    productsOnStock(state) {
      return state.products.filter(product => {
        return product.inventory > 0;
      });
    }
  }
});
