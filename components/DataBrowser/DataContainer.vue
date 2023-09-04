<template>
  <div>
    <span v-if="$route.query.type === 'dataset'">
      <SearchData v-on:searchContent="updateSearch" />
      <div class="data-container">
        <div>
          <FilterData
            v-on:filter-facet="updateFilterFacet"
            v-on:relation="updateRelation"
          />
        </div>
        <div>
          <PaginationTool
            v-if="totalCount >= 0"
            :totalCount="totalCount"
            v-on:page-limit="updatePageLimit"
            v-on:order="updateOrder"
          />
          <DisplayData
            v-loading="isLoading"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            :dataDetails="currentData"
            :isLoadingSearch="isLoading"
            :totalCount="totalCount"
          />
          <PaginationTool
            v-if="totalCount >= 0"
            :totalCount="totalCount"
            v-on:page-limit="updatePageLimit"
            v-on:order="updateOrder"
          />
        </div>
      </div>
    </span>

    <!-- display tools -->
    <span v-if="$route.query.type === 'tools'">
      <SearchData />
      <div class="data-container">
        <FilterData />
      </div>
    </span>

    <!-- display news -->
    <span v-if="$route.query.type === 'news'">
      <SearchData />
      <div class="data-container">
        <FilterData />
      </div>
    </span>

    <!-- display laboursInfo -->
    <span v-if="$route.query.type === 'laboursInfo'">
      <SearchData />
      <div class="data-container">
        <FilterData />
      </div>
    </span>

    <!-- display workflows -->
    <span v-if="$route.query.type === 'workflows'">
      <SearchData />
      <div class="data-container">
        <FilterData />
      </div>
    </span>

    <!-- display dashboard -->
    <span v-if="$route.query.type === 'dashboard'">
      <!-- <SearchData />
      <div class="data-container">
        <FilterData />
      </div> -->
      <br />
      <Dashboard />
    </span>
  </div>
</template>

<script>
import backendQuery from "@/services/backendQuery";
import PaginationTool from "./PaginationTool.vue";
import SearchData from "./SearchData.vue";
import FilterData from "./FilterData.vue";
import DisplayData from "./DisplayData.vue";
import Dashboard from "./Dashboard.vue";

export default {
  components: {
    PaginationTool,
    SearchData,
    FilterData,
    DisplayData,
    Dashboard,
  },
  props: ["category"],
  data: () => {
    return {
      isLoading: true,
      totalCount: -1,
      currentData: [],
      pageNumber: -1,
      limitNumber: -1,
      facetList: [],
      filterDict: {},
      searchContent: "",
      relationAND: true,
      currentOrder: undefined,
    };
  },

  created: function() {
    if (this.$route.query.facets) {
      this.facetList = this.$route.query.facets.split(",");
      this.relationAND = this.$route.query.relation === "and" ? true : false;
    } else {
      this.fetchData();
    }
    if (this.$route.query.search) {
      this.searchContent = this.$route.query.search;
    }
    if (this.$route.query.order) {
      this.currentOrder = this.$route.query.order;
    }
  },

  watch: {
    "$route.query": {
      handler() {
        this.fetchData();
      },
    },
  },

  methods: {
    async fetchData() {
      this.isLoading = true;
      const result = await backendQuery.fetchPaginationData(
        this.$config.query_api_url,
        this.filterDict,
        this.$route.query.limit,
        this.$route.query.page,
        this.searchContent,
        this.relationAND ? "and" : "or",
        this.currentOrder
      );
      this.currentData = result["items"];
      this.totalCount = result["total"];
      this.isLoading = false;
    },

    compareFilter(oldFilter, oldFilterLength, newFilter, newFilterLength) {
      let isDifferent = false;
      if (newFilterLength !== oldFilterLength) {
        isDifferent = true;
      } else {
        const greaterEqualFilter =
          newFilterLength <= oldFilterLength ? oldFilter : newFilter;
        const lessFilter =
          newFilterLength > oldFilterLength ? oldFilter : newFilter;
        for (const key in greaterEqualFilter) {
          if (key in lessFilter) {
            if (lessFilter[key].length !== greaterEqualFilter[key].length) {
              isDifferent = true;
            }
          } else {
            isDifferent = true;
          }
        }
      }
      return isDifferent;
    },

    compareFacet(oldFacet, newFacet) {
      if (newFacet.length !== oldFacet.length) {
        return true;
      }
      return false;
    },

    updateFilterFacet(filterVal, facetVal) {
      const currentFilterLength = Object.keys(this.filterDict).length;
      const incomingFilterLength = Object.keys(filterVal).length;
      const isRefreshWithFacet =
        currentFilterLength === 0 && this.facetList.length !== 0;
      const isFilterChanged = this.compareFilter(
        this.filterDict,
        currentFilterLength,
        filterVal,
        incomingFilterLength
      );
      const isFacetChanged = this.compareFacet(this.facetList, facetVal);
      if (isFilterChanged || isFacetChanged) {
        this.filterDict = JSON.parse(JSON.stringify(filterVal));
        this.facetList = facetVal;
        this.updateURL(isRefreshWithFacet ? this.$route.query.page : 1);
        // url query not change, cannot trigger watch
        // force fetch
        if (isRefreshWithFacet) {
          this.fetchData();
        }
      }
    },

    updateRelation(val) {
      // const relationVal = val ? "and" : "or";
      const isRelationChanged = this.relationAND === val ? false : true;
      if (isRelationChanged) {
        this.relationAND = val;
        this.updateURL(1);
      }
    },

    updateSearch(val) {
      const isSearchChanged = this.searchContent === val ? false : true;
      if (isSearchChanged) {
        this.searchContent = val;
        this.updateURL(1);
      }
    },

    updatePageLimit(pageVal, limitVal) {
      const isPageChanged = this.pageNumber === pageVal ? false : true;
      const isLimitChanged = this.limitNumber === limitVal ? false : true;
      if (isPageChanged || isLimitChanged) {
        this.pageNumber = pageVal;
        this.limitNumber = limitVal;
        this.updateURL(pageVal, limitVal);
      }
    },

    updateOrder(val) {
      const isOrderChanged = this.currentOrder === val ? false : true;
      if (isOrderChanged) {
        this.currentOrder = val;
        this.updateURL(1);
      }
    },

    updateURL(page = this.$route.query.page, limit = this.$route.query.limit) {
      let query = {
        type: this.$route.query.type,
        page: page,
        limit: limit,
      };

      if (this.facetList.length > 0) {
        query.facets = this.facetList.toString();
        query.relation = this.relationAND ? "and" : "or";
      }
      if (this.searchContent !== "") {
        query.search = this.searchContent;
      }
      query.order = this.currentOrder;

      this.$router.push({
        path: this.$route.path,
        query: query,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.data-container {
  min-width: 15rem;
  gap: 2rem;

  @media only screen and (min-width: $viewport-sm) {
    display: flex;
  }

  @media only screen and (max-width: $viewport-md) {
    gap: 1rem;
  }
}
</style>
