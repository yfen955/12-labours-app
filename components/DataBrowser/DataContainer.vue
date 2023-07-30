<template>
  <div>
    <span v-if="$route.query.type === 'dataset'">
      <SearchData v-on:search_content="updateSearch" />
      <div class="data-container">
        <div>
          <FilterData
            v-on:filter="updateFilter"
            v-on:relation="updateRelation"
          />
        </div>
        <div>
          <DisplayData
            v-loading="isLoading"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            :dataDetails="currentData"
            :isLoadingSearch="isLoading"
            :totalCount="totalCount"
            v-on:sort_changed="updateSort"
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
import SearchData from "./SearchData.vue";
import FilterData from "./FilterData.vue";
import DisplayData from "./DisplayData.vue";
import Dashboard from "./Dashboard.vue";

export default {
  components: { SearchData, FilterData, DisplayData, Dashboard },
  props: ["category"],
  data: () => {
    return {
      isLoading: true,
      totalCount: 0,
      currentData: [],
      filterDict: {},
      searchContent: "",
      relationType: "and",
      sortBy: "Published(asc)",
    };
  },

  watch: {
    "$route.query.page": function() {
      this.fetchData();
    },

    "$route.query.limit": function() {
      this.fetchData();
    },
  },

  methods: {
    async fetchData() {
      this.isLoading = true;
      let result = await backendQuery.fetchPaginationData(
        this.$config.query_api_url,
        this.filterDict,
        this.$route.query.limit,
        this.$route.query.page,
        this.searchContent,
        this.relationType,
        this.sortBy
      );
      this.currentData = result["items"];
      this.totalCount = result["total"];
      this.isLoading = false;
    },

    updateSearch(val) {
      const isSearchChanged = this.searchContent === val ? false : true;
      if (isSearchChanged) {
        console.log("search fetch");
        this.searchContent = val;
        this.fetchData();
      }
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

    updateFilter(val) {
      const isEmptyFilter =
        Object.keys(val).length === 0 && val.constructor === Object;
      const isFilterChanged = this.compare2Filter(this.filterDict, val);
      if (isEmptyFilter || isFilterChanged) {
        console.log("filter fetch");
        this.filterDict = JSON.parse(JSON.stringify(val));
        this.fetchData();
      }
    },

    updateRelation(val) {
      const newRelation = val ? "and" : "or";
      const isRelationChanged =
        newRelation === this.relationType ? false : true;
      if (isRelationChanged) {
        console.log("relation fetch");
        this.relationType = newRelation;
        this.fetchData();
      }
    },

    updateSort(val) {
      this.sortBy = val;
      this.fetchData();
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
