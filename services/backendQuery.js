import axios from "axios";

async function fetchPaginationData(path, filter, limit, page, relation) {
  let fetched_data = [];
  let totalNum = 0;
  let payload = {
    filter: filter,
    limit: parseInt(limit),
    page: parseInt(page),
    relation: relation,
  };
  await axios
    .post(path, payload)
    .then((res) => {
      fetched_data = res.data.items;
      totalNum = res.data.total;
    })
    .catch((err) => {
      console.log(err);
    });
  return new Array(fetched_data, totalNum);
}

async function fetchQueryData(path, node, filter, search = "") {
  let fetched_data = [];
  let payload = {
    node: node,
    filter: filter,
    search: search,
  };
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

async function getSingleData(path, programName, projectName) {
  let fetched_data = [];
  let payload = {
    program: programName,
    project: projectName,
  };
  await axios
    .post(path, payload)
    .then((res) => {
      fetched_data = res.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
  return fetched_data;
}

async function fetchFilterData(path) {
  let filter = {};
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
  fetchFilterData,
};
