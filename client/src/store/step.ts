interface state {
  step: number;
}

export const state:state = {
  step: 0
};

export const actions = {
 
};

export const mutations = {
  nextStep(state:state) {
    state.step = state.step + 1;
    console.log('nextSt step: ', state.step);
  },
  prevStep(state:state) {
    state.step = state.step - 1;
    console.log('prevSt step: ', state.step);
  },
  setStep: (state:state, payload: number) => {
    state.step = payload;
    console.log('setStep step: ', state.step);
  }
};

export const getters = {
  getStep: (state:state) => {
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