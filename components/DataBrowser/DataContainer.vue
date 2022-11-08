<template>
  <div>
    <span v-if="$route.query.type === 'dataset'">
      <SearchData
        :currentFilterDict="currentFilterDict"
        v-on:matchData="updateModifiedData"
        v-on:search-content="updateSearchContent"
        v-on:isLoading="updateLoading"
      />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData
            :allFilterDict="allFilterDict"
            :searchContent="searchContent"
            v-on:filter-data="updateModifiedData"
            v-on:filter-dict="updateFilterDict"
            v-on:isLoading="updateLoading"
          />
        </el-col>
        <el-col :span="18">
          <DisplayData
            v-loading="isLoadingSearch"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            :dataDetails="currentData"
            :isLoadingSearch="isLoadingSearch"
            :payload="payload"
            :totalCount="totalCount"
          />
        </el-col>
      </el-row>
    </span>

    <!-- display tools -->
    <span v-if="$route.query.type === 'tools'">
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
    <span v-if="$route.query.type === 'news'">
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
    <span v-if="$route.query.type === 'laboursInfo'">
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
      isLoadingSearch: true,
      totalCount: 0,
      currentData: [],
      allFilterDict: {},
      currentFilterDict: {},
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
      this.dataChange(val);
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
      this.isLoadingSearch = true;
      let result = await backendQuery.fetchGraphqlData('experiment', this.currentFilterDict, this.searchContent, this.$route.query.limit, this.$route.query.page);
      this.currentData = result[0];
      this.totalCount = result[1];
      this.isLoadingSearch = false;
    },

    async fetchFilter() {
      const newPath = `${process.env.query_api_url}/filters`;
      await axios
        .post(newPath, this.payload)
        .then((res) => {
          this.allFilterDict = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async dataChange(val) {
      this.isLoadingSearch = true;
      this.currentData = [];
      if (val === 'tools') {}
      else if (val === 'news') {}
      else if (val === 'laboursInfo') {}
      else {  // if val === dataset
        await this.fetchFilter();
        await this.fetchData();
      }

      this.isLoadingSearch = false;
    },

    // update the data after they change
    updateModifiedData(data, total) {
      this.currentData = data;
      this.totalCount = total;
    },

    updateFilterDict(val) {
      this.currentFilterDict = val;
    },

    updateSearchContent(val) {
      this.searchContent = val;
    },

    updateTotalNum(val) {
      this.updateTotalNum = val;
    },

    updateLoading(val) {
      this.isLoadingSearch = val;
    }
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 1em;
}
</style>