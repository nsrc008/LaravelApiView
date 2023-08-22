// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    itemList: [], // Lista de elementos
  },
  mutations: {
    addItem(state, item) {
        state.itemList.push(item);
    },
    removeItem(state, itemId) {
        state.itemList = state.itemList.filter(item => item.id !== itemId);
    },
    setAuthentication(state, value) {
      state.isAuthenticated = value;
    },
  },
  actions: {
    loginAction({ commit }, data) {
      // Llama a la mutación para actualizar el estado de autenticación
      commit('setAuthentication', true);

      // Almacena los datos en localStorage (si es necesario)
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('email', data.email);
      localStorage.setItem('access_token', data.access_token);
    },

    logoutAction({ commit }) {
        // Llama a la mutación para actualizar el estado de autenticación
        commit('setAuthentication', false);
  
        // Almacena los datos en localStorage (si es necesario)
        localStorage.clear()
      },
  },
});