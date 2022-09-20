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
  const path = `${process.env.query_api_url}graphql`;
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

export default {
  fetchGraphqlData
}