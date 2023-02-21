import backendQuery from '@/services/backendQuery';

export const fetchModelInfo = async (id, store) => {
  let program = store.getters['getProgram'];
  let project = store.getters['getProject'];
  if (!program || !project) {
    let payload = await store.dispatch('fetchPayload');
    program = payload[0];
    project = payload[1];
  };
  let data = await backendQuery.getSingleData(id, program, project);
  return data;
};

export default {
  fetchModelInfo
}