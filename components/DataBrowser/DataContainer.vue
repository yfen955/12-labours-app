<template>
  <div>
    <span v-if="$route.query.type === 'dataset'">
      <SearchData v-on:search_content="updateSearchContent" />
      <div class="data-container">
        <div>
          <FilterData :allFilterDict="allFilterDict" v-on:filter-dict="updateFilterDict" v-on:relation="updateRelation" />
        </div>
        <div>
          <DisplayData v-loading="isLoadingSearch" element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading" :dataDetails="currentData" :isLoadingSearch="isLoadingSearch"
            :totalCount="totalCount" />
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
  </div>
</template>

<script>
import backendQuery from '@/services/backendQuery';
import SearchData from "./SearchData.vue";
import FilterData from "./FilterData.vue";
import DisplayData from "./DisplayData.vue";

export default {
  components: { SearchData, FilterData, DisplayData },
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
    }
  },

  created: function () {
    // when open find data page, call the function to fetch the data
    this.dataChange(this.$route.query.type);
  },

  watch: {
    // if the type variable in the url changes, change the current data to the data in that category
    '$route.query.type': function (val) {
      this.dataChange(val);
    },

    '$route.query.page': function () {
      this.fetchData();
    },

    '$route.query.limit': function () {
      this.fetchData();
    },
  },

  methods: {
    async fetchData() {
      this.isLoadingSearch = true;
      let result = await backendQuery.fetchPaginationData(this.$config.query_api_url, this.currentFilterDict, this.$route.query.limit, this.$route.query.page, this.searchContent, this.relation);
      this.currentData = result[0];
      this.totalCount = result[1];
      this.isLoadingSearch = false;
    },

    async fetchFilter() {
      this.allFilterDict = await backendQuery.fetchFilterData(this.$config.query_api_url);
    },

    dataChange(val) {
      this.isLoadingSearch = true;
      this.currentData = [];
      if (val === 'dataset') {
        this.fetchFilter();
      }
    },

    updateFilterDict(val) {
      this.currentFilterDict = val;
      this.fetchData();
    },

    updateSearchContent(val) {
      this.searchContent = val;
      this.fetchData();
    },

    updateLoading(val) {
      this.isLoadingSearch = val;
    },

    updateRelation(val) {
      if (val)
        this.relation = 'and';
      else
        this.relation = 'or';
      this.fetchData();
    }
  },
}
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