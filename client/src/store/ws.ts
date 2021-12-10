interface user {
  nickname: string;
}
interface receiveMsgData {
  type: number;
  msgid: number;
  uuid: string;
  date: string;
  msg: string;
  users: Array<user>;
  selectAvatarId: number;
  nickname: string;
}
interface state {
  wsRes: Array<receiveMsgData>;
}

export const state:state = {
  wsRes: []
};

export const actions = {};

export const mutations = {
  setWsRes(state:any, payload:receiveMsgData) {
    state.wsRes.push(payload);
    console.log('setWsRes payload: ', payload);
  }
};

export const getters = {
  latestRecord: (state:state) => {
    return state.wsRes[state.wsRes.length - 1];
  },
  users: (state:state) => {
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