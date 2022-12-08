import backendQuery from '@/services/backendQuery';

export const fetchModelInfo = async (id, store) => {
  let program = store.getters['getProgram'];
  let project = store.getters['getProject'];
  if (!program || !project) {
    await store.dispatch('fetchPayload');
    program = store.getters['getProgram'];
    project = store.getters['getProject'];
  };
  let data = await backendQuery.getSingleData(id, program, project);
  return data;
};

export default {
  fetchModelInfo
}