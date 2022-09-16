import axios from "axios";

async function fetchManifestData(node, filter, search, limit, page) {
  let fetched_data = [];
  let newPayload = {
    node: node,
    filter: filter,
    search: search,
    limit: limit,
    page: page,
  };
  console.log(newPayload);
  const path = `${process.env.query_api_url}graphql`;
  await axios
    .post(path, newPayload)
    .then((res) => {
    fetched_data = res.data.data;
  })
  .catch((err) => {
    console.log(err);
    fetched_data = [];
  });
  return fetched_data;
}

export default {
  fetchManifestData
}