<template>
  <div>
    <!-- display dataset -->
    <span v-if="!isLoadingSearch && $route.query.type === 'dataset'">
      <SearchData
        :currentData="currentData"
        v-on:matchData="matchSearchData"
      />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData :dataDetails="searchedData" v-on:filter-data="updateFilteredData" />
        </el-col>
        <el-col :span="18">
          <DisplayData :dataDetails="filteredData" :isLoadingSearch="isLoadingSearch" />
        </el-col>
      </el-row>
    </span>

    <!-- display tools -->
    <span v-if="!isLoadingSearch && $route.query.type === 'tools'">
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterData v-on:filter-data="updateFilteredData" />
        </el-col>
        <el-col :span="18">
          <DisplayTools :dataDetails="currentData" :isLoadingSearch="isLoadingSearch" />
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
            :tissues_type="tissues_type"
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
import datasetData from "../../assets/datasetData.json";
import SearchData from "./SearchData.vue";
import FilterData from "./FilterData.vue";
import DisplayData from "./DisplayData.vue";
import DisplayTools from "./DisplayTools.vue";
import FilterNews from "./FilterNews.vue";
import DisplayNews from "./DisplayNews.vue";
import sparcInfoData from "../../assets/sparcInfoData.json";

export default {
  components: { SearchData, FilterData, DisplayData, DisplayTools, FilterNews, DisplayNews },
  props: [ "category", "payload" ],
  data: () => {
    return {
      isLoadingSearch: false,
      currentData: datasetData,
      searchedData: datasetData,
      filteredData: datasetData,
      tissues_type: [],
      errorMessage: '',
    }
  },

  watch: {
    // if the type variable in the url changes, change the current data to the data in that category
    '$route.query.type': async function(val) {
      this.isLoadingSearch = true
      if (val === 'tools') {
        const path = `${process.env.query_api_url}nodes/core_metadata_collection`;
        await axios
          .post(path, this.payload)
          .then((res) => {
            this.currentData = res.data.data
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else if (val === 'news') {
        // const path = `${process.env.query_api_url}nodes/sample`;
        const path = `${process.env.query_api_url}dummy`;
        await axios
          // .post(path, this.payload)
          .get(path)
          .then((res) => {
            if (res.data.error)
              this.errorMessage = res.data.error
            else {
              // this.currentData = res.data.data
              this.currentData = res.data

              // find out which types of tissue exist & sort the list
              this.tissues_type = Array.from(new Set(this.currentData.map((data, index) =>{
                return data.tissue_type
              }))).sort()

              // remove the undefined data
              const nullIndex = this.tissues_type.findIndex(item => item == undefined);
              if (nullIndex !== -1)
                this.tissues_type.splice(nullIndex, 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else if (val === 'laboursInfo')
        this.currentData = sparcInfoData;
      else
        this.currentData = datasetData;

      // update the searchedData & filteredData to the currentData
      this.searchedData = this.currentData;
      this.filteredData = this.searchedData;
      this.isLoadingSearch = false;
    }
  },

  methods: {
    // update the data after search & filter
    matchSearchData(matchData) {
      this.searchedData = matchData;
      this.filteredData = this.searchedData;
    },
    updateFilteredData(data) {
      this.filteredData = data;
    },
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 1em;
}
</style>