<template>
  <div>
    <!-- display dataset -->
    <div v-if="!isLoadingSearch">
      <span v-if="$route.query.type === 'dataset'">
        <SearchData
          :filterDict="filterDict"
          v-on:matchData="updateModifiedData"
          v-on:search-content="updateSearchContent"
        />
        <el-row :gutter="24">
          <el-col :span="6" class="facet-menu">
            <FilterData
              :filterDict="filterDict"
              :searchContent="searchContent"
              v-on:filter-data="updateModifiedData"
              v-on:filter-dict="updateFilterDict"
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
    <div v-else class="loading-container"></div>

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
      currentData: [],
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
      this.currentData = result[0];
      this.totalCount = result[1];
    },

    async fetchFilter() {
      const newPath = `${process.env.query_api_url}filters`;
      await axios
        .post(newPath, this.payload)
        .then((res) => {
          this.filterDict = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async dataChange(val) {
      this.isLoadingSearch = true;

      // show loading when fetching data
      let thisContent = this;
      let loading = thisContent.$loading({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
      })

      if (val === 'tools') {
        
      }
      else if (val === 'news') {
        
      }
      else if (val === 'laboursInfo') {
        
      }
      else {  // if val === dataset
        await this.fetchData();
        
        // fetch all the filters
        await this.fetchFilter();
      }

      // close loading
      loading.close();
      this.isLoadingSearch = false;
    },

    // update the data after they change
    updateModifiedData(data, total) {
      this.currentData = data;
      this.totalCount = total;
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
.loading-container {
  height: 30em;
}
</style>