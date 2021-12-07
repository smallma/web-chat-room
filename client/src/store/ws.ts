export const state = {
  wsRes: {}
};
export const actions = {};

export const mutations = {
  setWsRes(state:any, payload:any) {
    state.wsRes = payload;
    console.log('payload: ', payload);
  }
};
export const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};