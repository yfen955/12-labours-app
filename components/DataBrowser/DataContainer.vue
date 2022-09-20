<template>
  <div>
    <!-- display dataset -->
    <span v-if="!isLoadingSearch && $route.query.type === 'dataset'">
      <SearchData
        :dataDetails="filteredData"
        :filterDict="filterDict"
        v-on:matchData="matchSearchData"
        v-on:search-changed="filterAgain"
        v-on:search-content="updateSearchContent"
        ref="search"
      />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData
            :dataDetails="searchedData"
            :filterDict="filterDict"
            :searchContent="searchContent"
            v-on:filter-data="updateFilteredData"
            v-on:filter-changed="searchAgain"
            v-on:filter-dict="updateFilterDict"
            ref="filter"
          />
        </el-col>
        <el-col :span="18">
          <DisplayData
            :dataDetails="currentData"
            :isLoadingSearch="isLoadingSearch"
            :payload="payload"
            :totalCount="totalCount"
          />
        </el-col>
      </el-row>
    </span>

    <!-- display tools -->
    <span v-if="!isLoadingSearch && $route.query.type === 'tools'">
      <SearchData />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData />
        </el-col>
        <el-col :span="18">
          <!-- <DisplayData /> -->
        </el-col>
      </el-row>
    </span>

    <!-- display news -->
    <span v-if="!isLoadingSearch && $route.query.type === 'news'">
      <SearchData />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData />
        </el-col>
        <el-col :span="18">
          <!-- <DisplayData /> -->
        </el-col>
      </el-row>
    </span>

    <!-- display laboursInfo -->
    <span v-if="!isLoadingSearch && $route.query.type === 'laboursInfo'">
      <SearchData />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData />
        </el-col>
        <el-col :span="18">
          <!-- <DisplayData /> -->
        </el-col>
      </el-row>
    </span>

  </div>
</template>

<script>
import axios from 'axios';
import backendQuery from '@/services/backendQuery';
import SearchData from "./SearchData.vue";
import FilterData from "./FilterData.vue";
import DisplayData from "./DisplayData.vue";

export default {
  components: { SearchData, FilterData, DisplayData },
  props: [ "category", "payload" ],
  data: () => {
    return {
      isLoadingSearch: false,
      totalCount: 0,
      originalData: [],
      currentData: [],
      searchedData: [],
      filteredData: [],
      filterDict: {},
      file_type: [],
      errorMessage: '',
      searchContent: "",
    }
  },

  created: function() {
    // when open find data page, call the function to fetch the data
    this.dataChange(this.$route.query.type);
  },

  watch: {
    // if the type variable in the url changes, change the current data to the data in that category
    '$route.query.type': function(val) {
      this.dataChange(val)
    },

    '$route.query.page': function(val) {
      this.fetchData();
    },
    
    '$route.query.limit': function(val) {
      this.fetchData();
    },
  },

  methods: {
    async fetchData() {
      let result = await backendQuery.fetchGraphqlData('experiment', this.filterDict, this.searchContent, this.$route.query.limit, this.$route.query.page);
      this.originalData = result[0];
      this.currentData = this.originalData;
      this.totalCount = result[1];
    },

    async fetchFilter() {
      let filter_dict = [];
      const newPath = `${process.env.query_api_url}filters`;
        let payload3 = {
          program: "demo1",
          project: "12L",
        }
        await axios
          .post(newPath, payload3)
          .then((res) => {
            filter_dict = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      return filter_dict;
    },

    async dataChange(val) {
      this.isLoadingSearch = true;
      if (val === 'tools') {
        
      }
      else if (val === 'news') {
        
      }
      else if (val === 'laboursInfo') {
        
      }
      else {  // if val === dataset
        await this.fetchData();
        
        // fetch all the data types
        this.filterDict = await this.fetchFilter();
      }

      // update the searchedData & filteredData to the originalData
      this.currentData = this.originalData;
      this.searchedData = this.originalData;
      this.filteredData = this.originalData;
      this.isLoadingSearch = false;
    },

    // update the variables after they change
    matchSearchData(data) {
      this.searchedData = data;
      this.currentData = data;
    },

    updateFilteredData(data, total) {
      this.filteredData = data;
      this.currentData = data;
      this.totalCount = total;
    },

    filterAgain() {
      this.$refs.filter.handleChange(this.originalData);
    },

    searchAgain() {
      this.$refs.search.onSubmit(this.originalData);
    },

    updateFilterDict(val) {
      this.filterDict = val;
    },

    updateSearchContent(val) {
      this.searchContent = val;
    },

    updateTotalNum(val) {
      this.updateTotalNum = val;
    }
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 1em;
}
</style>