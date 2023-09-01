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
          <!-- <PaginationTool
            v-if="!isLoading"
            :totalCount="totalCount"
            v-on:page-limit="updatePageLimit"
            v-on:order="updateOrder"
          /> -->
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

    <!-- display laboursInfo -->
    <span v-if="$route.query.type === 'workflows'">
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
      totalCount: 0,
      currentData: [],
      facetList: [],
      filterDict: {},
      searchContent: "",
      relationType: "and",
      currentOrder: "Published(asc)",
    };
  },

  created: function() {
    if (this.$route.query.facets) {
      this.facetList = this.$route.query.facets.split(",");
      this.relationType = this.$route.query.relation;
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
        this.relationType,
        this.currentOrder
      );
      this.currentData = result["items"];
      this.totalCount = result["total"];
      this.isLoading = false;
    },

    compare2Filter(oldFilter, newFilter) {
      let isDifferent = false;
      if (Object.keys(newFilter).length !== Object.keys(oldFilter).length) {
        isDifferent = true;
      } else {
        const greaterEqualFilter =
          Object.keys(newFilter).length <= Object.keys(oldFilter).length
            ? oldFilter
            : newFilter;
        const lessFilter =
          Object.keys(newFilter).length > Object.keys(oldFilter).length
            ? oldFilter
            : newFilter;
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

    compare2Facet(oldFacet, newFacet) {
      let isDifferent = false;
      if (newFacet.length !== oldFacet.length) {
        isDifferent = true;
      }
      return isDifferent;
    },

    updateFilterFacet(filterVal, facetVal) {
      const isRefreshWithFacet =
        Object.keys(this.filterDict).length === 0 &&
        this.facetList.length !== 0;
      const isFilterChanged = this.compare2Filter(this.filterDict, filterVal);
      const isFacetChanged = this.compare2Facet(this.facetList, facetVal);
      if (isFilterChanged || isFacetChanged) {
        this.filterDict = JSON.parse(JSON.stringify(filterVal));
        this.facetList = facetVal;
        this.updateURL(isRefreshWithFacet ? this.$route.query.page : 1);
        if (isRefreshWithFacet) {
          this.fetchData();
        }
      }
    },

    updateRelation(val) {
      const newRelation = val ? "and" : "or";
      const isRelationChanged =
        newRelation === this.relationType ? false : true;
      if (isRelationChanged) {
        this.relationType = newRelation;
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
      this.updateURL(pageVal, limitVal);
    },

    updateOrder(val) {
      const isOrderChange = this.currentOrder === val ? false : true;
      if (isOrderChange) {
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
        query.relation = this.relationType;
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
