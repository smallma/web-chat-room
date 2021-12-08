export const state = {
  step: 0
};
export const actions = {
 
};

export const mutations = {
  nextStep(state:any) {
    state.step = state.step + 1;
    console.log('nextSt step: ', state.step);
  },
  prevStep(state:any) {
    state.step = state.step - 1;
    console.log('prevSt step: ', state.step);
  },
  setStep: (state:any, payload: number) => {
    state.step = payload;
    console.log('setStep step: ', state.step);
  }
};
export const getters = {
  getStep: (state:any) => {
    return state.step;
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};