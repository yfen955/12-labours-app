import axios from "axios";

async function fetchPaginationData(filter, search, limit, page, relation) {
  let fetched_data = [];
  let totalNum = 0;
  let payload = {
    filter: filter,
    limit: parseInt(limit),
    page: parseInt(page),
    relation: relation
  };
  let path = `${process.env.query_api_url}/graphql/pagination/?search=${search}`;
  await axios
    .post(path, payload)
    .then((res) => {
      fetched_data = res.data.items;
      totalNum = res.data.total;
    })
    .catch((err) => {
      console.log(err);
      fetched_data = [];
    });
  return new Array(fetched_data, totalNum);
}

async function fetchQueryData(node, filter, search = '') {
  let fetched_data = [];
  let payload = {
    node: node,
    filter: filter,
    search: search
  };
  const path = `${process.env.query_api_url}/graphql/query`;
  await axios
    .post(path, payload)
    .then((res) => {
      fetched_data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return fetched_data;
}

async function getSingleData(uuid, programName, projectName) {
  let fetched_data = [];
  let payload = {
    program: programName,
    project: projectName,
  };
  const path = `${process.env.query_api_url}/record/${uuid}`;
  await axios
    .post(path, payload)
    .then((res) => {
      fetched_data = res.data[0];
    })
    .catch((err) => {
      console.log(err);
      fetched_data = [];
    });
  return fetched_data;
}

async function fetchFilterData(sidebar) {
  let filter = {};
  const path = `${process.env.query_api_url}/filter/?sidebar=${sidebar}`;
  await axios
    .get(path)
    .then((res) => {
      filter = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return filter;
}

export default {
  fetchPaginationData,
  fetchQueryData,
  getSingleData,
  fetchFilterData
}