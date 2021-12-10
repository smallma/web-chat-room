
interface user {
  nickname: string;
  uuid: string;
  selectAvatarId: number;
}
interface state {
  user: user;
}

export const state:state = {
  user: {}
};

export const actions = {
};

export const mutations = {
  setUser(state:any, payload:user) {
    state.user = payload;
    console.log('setUser: ', payload);
  }
};
export const getters = {
  getUuid: (state:state) => {
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