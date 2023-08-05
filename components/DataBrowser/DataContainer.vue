<template>
  <div>
    <span v-if="$route.query.type === 'dataset'">
      <SearchData v-on:searchContent="updateSearch" />
      <div class="data-container">
        <div>
          <FilterData
            v-on:facet="updateFacet"
            v-on:filter="updateFilter"
            v-on:relation="updateRelation"
          />
        </div>
        <div>
          <PaginationTool
            :totalCount="totalCount"
            :toolType="'header'"
            v-on:page-limit="updatePageLimit"
            v-on:sort="updateSort"
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
            :totalCount="totalCount"
            :toolType="'footer'"
            v-on:page="updatePage"
            v-on:limit="updateLimit"
            v-on:sort="updateSort"
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
      currentSort: "Published(asc)",
    };
  },

  created: function() {
    this.fetchData();
  },

  watch: {
    "$route.query": {
      handler() {
        console.log(this.$route.query);
        this.fetchData();
      },
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
        this.currentSort
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

    updateFacet(val) {
      this.facetList = val;
    },

    updateFilter(val) {
      const isEmptyFilter =
        Object.keys(val).length === 0 && val.constructor === Object;
      const isFilterChanged = this.compare2Filter(this.filterDict, val);
      if (isEmptyFilter || isFilterChanged) {
        console.log("filter fetch");
        this.filterDict = JSON.parse(JSON.stringify(val));
        this.updateURL();
      }
    },

    updateRelation(val) {
      const newRelation = val ? "and" : "or";
      const isRelationChanged =
        newRelation === this.relationType ? false : true;
      if (isRelationChanged) {
        console.log("relation fetch");
        this.relationType = newRelation;
        this.updateURL();
      }
    },

    updateSearch(val) {
      const isSearchChanged = this.searchContent === val ? false : true;
      if (isSearchChanged) {
        console.log("search fetch");
        this.searchContent = val;
        this.updateURL();
      }
    },

    updatePageLimit(pageVal, limitVal) {
      this.updateURL(pageVal, limitVal);
    },

    updateSort(val) {
      const isSortChange = this.currentSort === val ? false : true;
      if (isSortChange) {
        console.log("sort fetch");
        this.currentSort = val;
        this.updateURL();
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
      query.order = this.currentSort;

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
