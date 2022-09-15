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
            :mime_type_list="mime_type_list"
            :mime_dict="mime_dict"
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
            :limit="limit"
            :totalCount="totalCount"
            v-on:pageChange="updateCurrentPage"
          />
        </el-col>
      </el-row>
    </span>

    <!-- display tools -->
    <span v-if="!isLoadingSearch && $route.query.type === 'tools'">
      <SearchData
        :dataDetails="filteredData"
        :filterDict="filterDict"
        v-on:matchData="matchSearchData"
        v-on:search-changed="filterAgain"
        ref="search"
      />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData
            :dataDetails="searchedData"
            v-on:filter-data="updateFilteredData"
            v-on:filter-changed="searchAgain"
            v-on:filter-dict="updateFilterDict"
            ref="filter"
          />
        </el-col>
        <el-col :span="18">
          <DisplayData :dataDetails="currentData" :isLoadingSearch="isLoadingSearch" :payload="payload" />
        </el-col>
      </el-row>
    </span>

    <!-- display news -->
    <span v-if="!isLoadingSearch && $route.query.type === 'news'">
      <SearchData
        :currentData="currentData"
        v-on:matchData="matchSearchData"
      />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData
            v-on:filter-data="updateFilteredData"
            :file_type="file_type"
            :dataDetails="searchedData"
          />
        </el-col>
        <el-col :span="18">
          <span v-if="errorMessage === ''">
            <DisplayData :isLoadingSearch="isLoadingSearch" :dataDetails="filteredData" :payload="payload" />
          </span>
          <span v-else>{{errorMessage}}</span>
        </el-col>
      </el-row>
    </span>

    <!-- display laboursInfo -->
    <span v-if="!isLoadingSearch && $route.query.type === 'laboursInfo'">
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData v-on:filter-data="updateFilteredData" />
        </el-col>
        <el-col :span="18">
          <DisplayData :dataDetails="currentData" />
        </el-col>
      </el-row>
    </span>

  </div>
</template>

<script>
import axios from "axios";
import dummyData from "../../assets/datasetData.json";
import SearchData from "./SearchData.vue";
import FilterData from "./FilterData.vue";
import DisplayData from "./DisplayData.vue";

export default {
  components: { SearchData, FilterData, DisplayData },
  props: [ "category", "payload" ],
  data: () => {
    return {
      isLoadingSearch: false,
      currentPage: 1,
      limit: 5,
      totalCount: 0,
      originalData: [],
      currentData: [],
      searchedData: [],
      filteredData: [],
      mime_type_list: [],
      mime_dict: {},
      file_type: [],
      errorMessage: '',
      filterDict: {},
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
  },

  methods: {
    async fetchData() {
      const path = `${process.env.query_api_url}graphql`;
      let payload2 = {
        node: 'experiment',
        filter: {},
        search: "",
        limit: this.limit,
        page: this.currentPage,
      }
      await axios
        .post(path, payload2)
        .then((res) => {
          this.originalData = res.data.data;
          this.currentData = res.data.data;
          this.totalCount = res.data.total;
        })
        .catch((err) => {
          console.log(err);
          this.originalData = [];
        });
    },

    async dataChange(val) {
      this.isLoadingSearch = true
      if (val === 'tools') {
        this.originalData = dummyData;
      }
      else if (val === 'news') {

      }
      else if (val === 'laboursInfo') {
        
      }
      else {  // if val === dataset
        await this.fetchData();
        
        // fetch all the data types
        const newPath = `${process.env.query_api_url}filter/mimetypes`;
        let payload3 = {
          program: "demo1",
          project: "12L",
        }
        await axios
          .post(newPath, payload3)
          .then((res) => {
            this.mime_type_list = Object.keys(res.data);
            this.mime_dict = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
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

    updateFilteredData(data) {
      this.filteredData = data;
      this.currentData = data;
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

    async updateCurrentPage(val) {
      this.currentPage = val;
      await this.fetchData();
    }
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 1em;
}
</style>