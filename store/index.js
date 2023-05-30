export const state = () => ({
  facets_id_list: [],
});

export const getters = {
  getFacetId(state) {
    return state.facets_id_list;
  },
};

export const mutations = {
  setFacetIds(state, text) {
    state.facets_id_list = text;
  },
};

export const actions = {
  setFacets({ commit }, facetIds) {
    commit("setFacetIds", facetIds);
  },
};

export default {
  getters,
  mutations,
  actions,
};
