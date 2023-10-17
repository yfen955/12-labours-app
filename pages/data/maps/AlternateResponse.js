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
      if (filter.facet != "Show all") {
        if (filter.facetPropPath in allFilter) {
          allFilter[filter.facetPropPath].push(filter.facet);
        } else {
          allFilter[filter.facetPropPath] = [filter.facet];
        }
      }
    }
  }
  const searchData = await backendQuery.fetchPaginationData(
    payload.queryUrl,
    allFilter,
    payload.numberPerPage,
    payload.page,
    search
  );
  callback(searchData);
};

const getFacets = async (payload, callback) => {
  const facets = await backendQuery.fetchFilterData(payload.queryUrl, true);
  const returnedPayload = {
    data: facets,
  };
  callback(returnedPayload);
};

const getOneOffToken = async (payload, callback) => {
  await backendQuery.fetchOneOffToken(payload.queryUrl);
  callback();
};

export const mySearch = (payload, callback) => {
  if (payload && callback) {
    if (payload.requestType == "Search") {
      searchDataset(payload, callback);
      return;
    } else if (payload.requestType == "getFacets") {
      getFacets(payload, callback);
    } else if (payload.requestType == "getToken") {
      getOneOffToken(payload, callback);
    }
  }
};
