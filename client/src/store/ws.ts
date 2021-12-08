export const state = {
  wsRes: []
};

export const actions = {};

export const mutations = {
  setWsRes(state:any, payload:any) {
    state.wsRes.push(payload);
    console.log('setWsRes payload: ', payload);
  }
};

export const getters = {
  latestRecord: (state:any) => {
    return state.wsRes[state.wsRes.length - 1];
  },
  users: (state:any) => {
    return state.wsRes[state.wsRes.length - 1].users;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};