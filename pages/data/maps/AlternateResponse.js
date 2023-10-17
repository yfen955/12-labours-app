import backendQuery from "../../../services/backendQuery";

/* eslint-disable no-alert, no-console */

const handleToken = () => {
  const query_access_token = backendQuery.getLocalStorage("query_access_token");
  const one_off_token = backendQuery.getLocalStorage("one_off_token");
  return query_access_token ? query_access_token : one_off_token;
};

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
    search,
    "and",
    "published(asc)",
    handleToken()
  );
  callback(searchData);
};

const getFacets = async (payload, callback) => {
  const facets = await backendQuery.fetchFilterData(
    payload.queryUrl,
    true,
    handleToken()
  );
  const returnedPayload = {
    data: facets,
  };
  callback(returnedPayload);
};

const getOneOffToken = async (payload, callback) => {
  await backendQuery.fetchOneOffToken(payload.queryUrl, handleToken());
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
