import axios from "axios";

function getLocalStorage(key) {
  if (process.client) {
    const value = localStorage.getItem(key)
    if (!value) {
      return undefined
    }
    return value
  }
}

function setLocalStorage(key, value) {
  if (process.client) {
    localStorage.setItem(key, value);
  }
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    // return "Tablet";
    return "T";
  }
  else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    // return "Mobile";
    return "M";
  }
  // return "Desktop";
  return "D";
};

function getBrowserType() {
  const test = regexp => {
    return regexp.test(navigator.userAgent);
  };

  if (test(/opr\//i) || !!window.opr) {
    // return "Opera";
    return "O";
  } else if (test(/edg/i)) {
    // return "MicrosoftEdge";
    return "ME";
  } else if (test(/chrome|chromium|crios/i)) {
    // return "GoogleChrome";
    return "GC";
  } else if (test(/firefox|fxios/i)) {
    // return "MozillaFirefox";
    return "MF";
  } else if (test(/safari/i)) {
    // return "AppleSafari";
    return "AS";
  } else if (test(/trident/i)) {
    // return "MicrosoftInternetExplorer";
    return "MIE";
  } else if (test(/ucbrowser/i)) {
    // return "UCBrowser";
    return "UCB";
  } else if (test(/samsungbrowser/i)) {
    // return "SamsungBrowser";
    return "SB";
  } else {
    // return "Unknown";
    return "U";
  }
}


function generateMachineId() {
  const deviceType = getDeviceType();
  const browserType = getBrowserType();
  let result = `${deviceType}_${browserType}_`;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function getMachineId() {
  let machineId = getLocalStorage("machine_id");
  if (!machineId) {
    machineId = generateMachineId()
    setLocalStorage("machine_id", machineId);
  }
  return machineId;
}

async function fetchAccessToken(path, user) {
  let machineId = getMachineId()
  let accessToken = "";
  let payload = {
    identity: `${user}>${machineId}`,
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
  const accessToken = getLocalStorage("access_token")
  if (!accessToken) {
    await axios
      .delete(`${path}/access/revoke`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLocalStorage("access_token", undefined)
      })
      .catch((error) => {
        setLocalStorage("access_token", undefined)
      });
  }
}

async function fetchPaginationData(path, filter, limit, page, search, relation, sortBy) {
  const accessToken = getLocalStorage("access_token")
  let fetched_data = {
    items: [],
    total: 0
  };
  let payload = {
    filter: filter,
    limit: parseInt(limit),
    page: parseInt(page),
    relation: relation
    order: sortBy
  };
  await axios
    .post(`${path}/graphql/pagination/?search=${search}`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
  const accessToken = getLocalStorage("access_token")
  let filter = {};
  await axios
    .get(`${path}/filter/?sidebar=${sidebar}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
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
  fetchPaginationData,
  fetchQueryData,
  getSingleData,
  fetchFilterData,
  fetchFiles,
};
