// import Vue from "vue";
// import Vuex from "vuex";
// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: { ws }
// });



import { createStore } from "vuex";
import ws from "./ws";
import step from "./step";
import user from "./user";

export default createStore({
  state() {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: { ws, step, user }
});