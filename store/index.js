export const state = () => ({
  program: '',
  project: '',
});

export const getters = {
  getProgram(state) {
    return state.program;
  },

  getProject(state) {
    return state.project;
  }
}

export const mutations = {
  setProgram(state, text) {
    state.program = text;
  },

  setProject(state, text) {
    state.project = text;
  },
};

export const actions = {
  async fetchProgram({commit}) {
    let path = `${process.env.query_api_url}/program`;
    let data = await this.$axios.$get(path);
    commit('setProgram', data.program[0]);
    return data.program[0];
  },

  async fetchProject({commit}, program) {
    let path = `${process.env.query_api_url}/project/${program}`;
    let data = await this.$axios.$get(path);
    commit('setProject', data.project[0]);
    return data.project[0];
  },
}

export default {
  getters,
  mutations,
  actions
}