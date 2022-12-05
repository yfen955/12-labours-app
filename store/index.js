import axios from 'axios';

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
  async fetchPayload({commit}) {
    let program, project;
    let programPath = `${process.env.query_api_url}/program`;
    await axios
      .get(programPath)
      .then((res) => {
        program = res.data.program[0];
        commit('setProgram', program);
      })
      .catch((err) => {
        console.log(err);
      });
    
    let projectPath = `${process.env.query_api_url}/project/${program}`;
    await axios
      .get(projectPath)
      .then((res) => {
        project = res.data.project[0];
        commit('setProject', project);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  setFacets({commit}, facetIds) {
    commit('setFacetIds', facetIds);
  }
}

export default {
  getters,
  mutations,
  actions
}