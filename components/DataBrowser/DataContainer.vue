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
      <SearchNews
        :currentData="currentData"
        v-on:matchData="matchSearchData"
      />
      <el-row :gutter="24">
        <el-col :span="6" class="facet-menu">
          <FilterNews
            v-on:filter-data="updateFilteredData"
            :tissues_type="tissues_type"
            :dataDetails="searchedData"
          />
        </el-col>
        <el-col :span="18">
          <span v-if="errorMessage === ''">
            <DisplayNews :isLoadingSearch="isLoadingSearch" :dataDetails="filteredData" :payload="payload" />
          </span>
          <span v-else>{{errorMessage}}</span>
        </el-col>
      </el-row>
    </span>
    <!-- display sparcInfo -->
    <span v-if="!isLoadingSearch && $route.query.type === 'sparcInfo'">
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
import SearchNews from "./SearchNews.vue";
import FilterNews from "./FilterNews.vue";
import DisplayNews from "./DisplayNews.vue";
import sparcInfoData from "../../assets/sparcInfoData.json";

export default {
  components: { SearchData, FilterData, DisplayData, DisplayTools, SearchNews, FilterNews, DisplayNews },
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
    '$route.query.type': async function(val) {
      this.isLoadingSearch = true
      if (val === 'tools') {
        const path = `https://abi-12-labours-api.herokuapp.com/nodes/core_metadata_collection`;
        await axios
          .post(path, this.payload)
          .then((res) => {
            // console.log(res.data.data);
            this.currentData = res.data.data
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else if (val === 'news') {
        const path = `https://abi-12-labours-api.herokuapp.com/nodes/sample`;
        await axios
          .post(path, this.payload)
          .then((res) => {
            // console.log(res.data);
            if (res.data.error)
              this.errorMessage = res.data.error
            else {
              this.currentData = res.data.data
              this.tissues_type = Array.from(new Set(this.currentData.map((data, index) =>{
                return data.tissue_type
              }))).sort()
              const nullIndex = this.tissues_type.findIndex(item => item == undefined);
              this.tissues_type.splice(nullIndex, 1);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else if (val === 'sparcInfo')
        this.currentData = sparcInfoData;
      else
        this.currentData = datasetData;
      this.searchedData = this.currentData;
      this.filteredData = this.searchedData;
      this.isLoadingSearch = false;
    }
  },

  methods: {
    matchSearchData(matchData) {
      this.searchedData = matchData;
      this.filteredData = this.searchedData;
    },

    updateFilteredData(data) {
      this.filteredData = data;
    },

    selectedNewsTypes(tissues) {
      if (tissues.length > 0) {
        this.filteredData = this.searchedData.filter((data, index) => {
          let existTissue = tissues.findIndex(item => item === data.tissue_type)
          if (existTissue !== -1)
            return data
        })
      } else
        this.filteredData = this.searchedData
    }
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 1em;
}
</style>