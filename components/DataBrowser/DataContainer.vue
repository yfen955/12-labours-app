<template>
  <div>
    <span v-if="$route.query.type === 'dataset'">
      <SearchData
        v-on:search_list="updateSearchedIds"
        v-on:isLoading="updateLoading"
      />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData
            :allFilterDict="allFilterDict"
            :searched_ids="searched_ids"
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
      searched_ids: {},
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

    '$route.query.page': function() {
      this.fetchData();
    },
    
    '$route.query.limit': function() {
      this.fetchData();
    },
  },

  methods: {
    async fetchData() {
      this.isLoadingSearch = true;
      let result = await backendQuery.fetchPaginationData('experiment', this.currentFilterDict, this.searched_ids, this.$route.query.limit, this.$route.query.page);
      this.currentData = result[0];
      this.totalCount = result[1];
      this.isLoadingSearch = false;
    },

    async fetchFilter() {
      const newPath = `${process.env.query_api_url}/filter`;
      await axios
        .get(newPath)
        .then((res) => {
          this.allFilterDict = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    dataChange(val) {
      this.isLoadingSearch = true;
      this.currentData = [];
      if (val === 'dataset') {
        this.fetchFilter();
      }
      this.isLoadingSearch = false;
    },

    updateFilterDict(val) {
      this.currentFilterDict = val;
      this.fetchData();
    },

    updateSearchedIds(val) {
      if (val.length > 0)
        this.searched_ids['submitter_id'] = val;
      else
        this.searched_ids = {};
      this.fetchData();
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