import axios from "axios";

/* eslint-disable no-alert, no-console */
const searchDataset = async (payload, callback) => {
  let data = {};
  let search = "";
  let allFilter = {};

  if (payload.query) {
    search = payload.query;
  }
  if (payload.filters !== undefined) {
    for (let i = 0; i < payload.filters.length; i++) {
      let filter = payload.filters[i];
      let node;
      let field;
      let element;
      let subFilter = {};
      let exist = false;
      if (filter.facet != "Show all") {
        let filterPayload = filter.facetPropPath.split(">");
        node = filterPayload[0];
        field = filterPayload[1];
        element = filter.facet;
        Object.entries(allFilter).forEach((entry) => {
          const [key, value] = entry;
          if (node == value.node) {
            Object.keys(value.filter).forEach((subkey) => {
              if (node == value.node && field == subkey) {
                exist = true;
                allFilter[key]["filter"][field].push(element);
              } else {
                exist = false;
              }
            });
          }
        });
        if (exist == false) {
          subFilter["node"] = node;
          subFilter["filter"] = {};
          subFilter["filter"][field] = [];
          subFilter["filter"][field].push(element);
          allFilter[i] = subFilter;
        }
      }
    }
  }
  let url = `${payload.queryUrl}/graphql/pagination/?search=${search}`;
  let postPayload = {
    filter: allFilter,
    limit: payload.numberPerPage,
    page: payload.page,
  };
  await axios
    .post(url, postPayload)
    .then((response) => (data = response.data))
    .catch((err) => {
      console.log(err);
    });
  const searchData = data;
  callback(searchData);
};

const getFacets = async (payload, callback) => {
  let facet = {};
  let url = `${payload.queryUrl}/filter/?sidebar=true`;
  await axios
    .get(url)
    .then((response) => (facet = response.data))
    .catch((err) => {
      console.log(err);
    });
  const facets = facet;
  const returnedPayload = {
    data: facets,
  };
  callback(returnedPayload);
};

export const mySearch = (payload, callback) => {
  if (payload && callback) {
    if (payload.requestType == "Search") {
      searchDataset(payload, callback);
      return;
    } else if (payload.requestType == "getFacets") {
      getFacets(payload, callback);
    }
  }
};
