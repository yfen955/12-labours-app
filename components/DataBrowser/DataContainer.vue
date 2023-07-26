<template>
  <div>
    <span v-if="$route.query.type === 'dataset'">
      <SearchData v-on:search_content="updateSearchContent" />
      <div class="data-container">
        <div>
          <FilterData
            :allFilterDict="allFilterDict"
            v-on:filter-dict="updateFilterDict"
            v-on:relation="updateRelation"
          />
        </div>
        <div>
          <DisplayData
            v-loading="isLoadingSearch"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            :dataDetails="currentData"
            :isLoadingSearch="isLoadingSearch"
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
      isLoadingSearch: true,
      totalCount: 0,
      currentData: [],
      allFilterDict: {},
      currentFilterDict: {},
      file_type: [],
      errorMessage: '',
      searchContent: '',
      relation: 'and',
      sortBy: 'Published(asc)',
    }
  },

  created: function() {
    // when open find data page, call the function to fetch the data
    this.dataChange(this.$route.query.type);
  },

  watch: {
    // if the type variable in the url changes, change the current data to the data in that category
    "$route.query.type": function(val) {
      this.dataChange(val);
    },

    "$route.query.page": function() {
      this.fetchData();
    },

    "$route.query.limit": function() {
      this.fetchData();
    },
  },

  methods: {
    async fetchData() {
      this.isLoadingSearch = true;
      let result = await backendQuery.fetchPaginationData(this.$config.query_api_url, this.currentFilterDict, this.$route.query.limit, this.$route.query.page, this.searchContent, this.relation, this.sortBy);
      this.currentData = result["items"];
      this.totalCount = result["total"];
      this.isLoadingSearch = false;
    },

    async fetchFilter() {
      this.allFilterDict = await backendQuery.fetchFilterData(
        this.$config.query_api_url,
        false
      );
    },

    dataChange(val) {
      this.isLoadingSearch = true;
      this.currentData = [];
      if (val === "dataset") {
        this.fetchFilter();
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

    updateFilterDict(filter_dict, relation) {
      const isEmptyFilter =
        Object.keys(filter_dict).length === 0 &&
        filter_dict.constructor === Object;
      const isFilterChanged = this.compare2Filter(
        this.currentFilterDict,
        filter_dict
      );
      this.updateRelation(relation, isFilterChanged);
      if (isEmptyFilter || isFilterChanged) {
        console.log("filter fetch");
        this.currentFilterDict = filter_dict;
        this.fetchData();
      }
    },
    
    updateSearchContent(val) {
      const isSearchChanged = this.searchContent === val ? false : true;
      if (isSearchChanged) {
        console.log("search fetch");
        this.searchContent = val;
        this.fetchData();
      }
    },

    updateLoading(val) {
      this.isLoadingSearch = val;
    },

    updateRelation(val, filterChanged = false) {
      const newRelation = val ? "and" : "or";
      const isRelationChanged = newRelation === this.relation ? false : true;
      if (isRelationChanged) {
        if (!filterChanged) {
          console.log("relation fetch");
          this.relation = newRelation;
          this.fetchData();
        }
      }
    },

    updateSort(val) {
      this.sortBy = val;
      this.fetchData();
    }
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
