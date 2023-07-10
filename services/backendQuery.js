import axios from "axios";

async function fetchAccessToken(path, user) {
  let accessToken = "";
  let payload = {
    email: user,
  };
  await axios
    .post(`${path}/access/token`, payload)
    .then((response) => {
      accessToken = response.data.access_token;
    })
    .catch((error) => {
      throw new Error(`${error}`);
    });
  return accessToken;
}

async function revokeAccess(path) {
  let token
  if (process.client) {
    token = localStorage.getItem("accessToken")
    if (token != undefined) {
      await axios
        .delete(`${path}/access/revoke`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).catch((error) => {
          localStorage.setItem("accessToken", undefined);
        });
    }
  }
}

async function fetchAccessScope(path) {
  let accessScope = [];
  let token
  if (process.client) {
    token = localStorage.getItem("accessToken")
    await axios
      .get(`${path}/access/authorize`, {
        headers: {
          Authorization: `Bearer ${token == undefined ? undefined : token}`,
        },
      })
      .then((response) => {
        accessScope = response.data.access;
      })
      .catch((error) => {
        localStorage.setItem("accessToken", undefined);
        fetchAccessScope(path)
      });
  }
  return accessScope;
}

async function fetchPaginationData(path, filter, limit, page, search, relation) {
  const access = await fetchAccessScope(path)
  let fetched_data = [];
  let payload = {
    filter: filter,
    limit: parseInt(limit),
    page: parseInt(page),
    relation: relation,
    access: access,
  };
  await axios
    .post(`${path}/graphql/pagination/?search=${search}`, payload)
    .then((res) => {
      fetched_data = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return fetched_data;
}

async function fetchQueryData(path, node, filter, search) {
  const access = await fetchAccessScope(path)
  let fetched_data = [];
  let payload = {
    node: node,
    filter: filter,
    search: search,
    access: access,
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

async function getSingleData(path, uuid) {
  const access = await fetchAccessScope(path)
  let fetched_data = [];
  let payload = {
    access: access[0],
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

async function fetchFilterData(path, sidebar) {
  const access = await fetchAccessScope(path)
  let filter = {};
  let payload = {
    access: access,
  };
  await axios
    .post(`${path}/filter/?sidebar=${sidebar}`, payload)
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
  await axios.post(path, payload).then((res) => {
    files_data = res.data;
  });
  return files_data;
}

export default {
  fetchAccessToken,
  revokeAccess,
  fetchAccessScope,
  fetchPaginationData,
  fetchQueryData,
  getSingleData,
  fetchFilterData,
  fetchFiles,
};
