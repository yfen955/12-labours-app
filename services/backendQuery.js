import axios from "axios";

async function fetchAccessScope(path, user) {
  let accessScope = []
  let accessToken = "";
  if (user == "public") {
    accessToken = "publicaccesstoken";
  } else {
    await axios
      .get(`${path}/access/token/${user}`)
      .then((response) => {
        accessToken = response.data.access_token;
      })
      .catch((error) => {
        throw new Error(`${error}`);
      });
  }
  await axios
    .get(`${path}/access/scope`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      accessScope = response.data.access
    })
    .catch((error) => {
      throw new Error(`${error}`);
    });
  return accessScope
}

async function fetchPaginationData(path, filter, limit, page, search, relation, access) {
  let fetched_data = [];
  let totalNum = 0;
  let payload = {
    filter: filter,
    limit: parseInt(limit),
    page: parseInt(page),
    relation: relation,
    access: access
  };
  await axios
    .post(`${path}/graphql/pagination/?search=${search}`, payload)
    .then((res) => {
      fetched_data = res.data.items;
      totalNum = res.data.total;
    })
    .catch((err) => {
      console.log(err);
    });
  return new Array(fetched_data, totalNum);
}

async function fetchQueryData(path, node, filter, search, access) {
  let fetched_data = [];
  let payload = {
    node: node,
    filter: filter,
    search: search,
    access: access
  };
  await axios
    .post(`${path}/graphql/query`, payload)
    .then((res) => {
      fetched_data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return fetched_data;
}

async function getSingleData(path, uuid, access) {
  let fetched_data = [];
  let payload = {
    access: access
  };
  await axios
    .post(`${path}/record/${uuid}`, payload)
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

async function fetchFiles(path, payload) {
  let files_data = {};
  await axios
    .post(path, payload)
    .then((res) => {
      files_data = res.data;
    })
  return files_data;
}

export default {
  fetchAccessScope,
  fetchPaginationData,
  fetchQueryData,
  getSingleData,
  fetchFilterData,
  fetchFiles,
};
