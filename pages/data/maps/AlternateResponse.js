import axios from "axios";
import backendQuery from "../../../services/backendQuery";

/* eslint-disable no-alert, no-console */
const searchDataset = async (payload, callback) => {
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
  const searchData = await backendQuery.fetchPaginationData(payload.queryUrl, allFilter, payload.numberPerPage, payload.page, search);
  callback(searchData);
};

const getFacets = async (payload, callback) => {
  const facets = await backendQuery.fetchFilterData(payload.queryUrl, true);
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
