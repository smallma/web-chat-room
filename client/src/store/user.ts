export const state = {
  user: {}
};
export const actions = {
 
};

export const mutations = {
  setUser(state:any, payload: any) {
    state.user = payload;
    console.log('setUser: ', payload);
  }
};
export const getters = {
  getUuid: (state:any) => {
    return state.user.uuid;
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};