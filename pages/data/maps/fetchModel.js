import backendQuery from '@/services/backendQuery';

export const fetchModelInfo = async (id, store) => {
  let program = store.getters['getProgram'];
  let project = store.getters['getProject'];
  if (!program || !project) {
    await store.dispatch('fetchProgram');
    program = store.getters['getProgram'];
    await store.dispatch('fetchProject', program);
    project = store.getters['getProject'];
  };
  let data = await backendQuery.getModelInfo(id, program, project);
  return data;
};

export default {
  fetchModelInfo
}