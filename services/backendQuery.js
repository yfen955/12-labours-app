import axios from "axios";

function getCurrentToken() {
  if (process.client) {
    const token = localStorage.getItem("accessToken")
    return token
  }
}

function setDefaultToken() {
  if (process.client) {
    localStorage.setItem("accessToken", undefined);
  }
}

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
  const token = getCurrentToken()
  if (token != undefined) {
    await axios
      .delete(`${path}/access/revoke`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDefaultToken()
      })
      .catch((error) => {
        setDefaultToken()
      });
  }
}

async function fetchAccessScope(path) {
  let accessScope = [];
  const token = getCurrentToken()
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
      setDefaultToken()
      fetchAccessScope(path)
    });
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

async function fetchQueryData(path, node, filter, search, access) {
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
      fetched_data = res.data[0];
    })
    .catch((err) => {
      console.log(err);
    });
  return fetched_data;
}

async function getSingleData(path, uuid, access) {
  let fetched_data = [];
  let payload = {
    access: access,
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
