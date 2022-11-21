import backendQuery from '@/services/backendQuery';

export const fetchModelInfo = async (id, store) => {
  let program = store.getters['getProgram'];
  let project = store.getters['getProject'];
  if (!program || !project) {
    program = await store.dispatch('fetchProgram');
    project = await store.dispatch('fetchProject', program);
  };
  let data = await backendQuery.getSingleData(id, program, project);
  return data;
};

export default {
  fetchModelInfo
}