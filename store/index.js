export const state = () => ({
  program: '',
  project: '',
  facets_id_list: [],
});

export const getters = {
  getProgram(state) {
    return state.program;
  },

  getProject(state) {
    return state.project;
  },

  getFacetId(state) {
    return state.facets_id_list;
  }
}

export const mutations = {
  setProgram(state, text) {
    state.program = text;
  },

  setProject(state, text) {
    state.project = text;
  },

  setFacetIds(state, text) {
    state.facets_id_list = text;
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

  getFacetIds({commit}, facetIds) {
    commit('setFacetIds', facetIds);
  }
}

export default {
  getters,
  mutations,
  actions
}