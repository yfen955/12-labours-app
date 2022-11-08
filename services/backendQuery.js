import axios from "axios";

async function fetchGraphqlData(node, filter, search, limit, page) {
  let fetched_data = [];
  let totalNum = 0;
  let payload = {
    node: node,
    filter: filter,
    search: search,
    limit: parseInt(limit),
    page: parseInt(page),
  };
  const path = `${process.env.query_api_url}/graphql`;
  await axios
    .post(path, payload)
    .then((res) => {
      fetched_data = res.data.data;
      totalNum = res.data.total;
    })
    .catch((err) => {
      console.log(err);
      fetched_data = [];
    });
  return new Array(fetched_data, totalNum);
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

export default {
  fetchGraphqlData,
  getSingleData
}