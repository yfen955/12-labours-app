<template>
  <div>
    <!-- display dataset -->
    <span v-if="!isLoadingSearch && $route.query.type === 'dataset'">
      <SearchData
        :dataDetails="filteredData"
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
            ref="filter"
          />
        </el-col>
        <el-col :span="18">
          <DisplayData :dataDetails="currentData" :isLoadingSearch="isLoadingSearch" :payload="payload" />
        </el-col>
      </el-row>
    </span>

    <!-- display tools -->
    <span v-if="!isLoadingSearch && $route.query.type === 'tools'">
      <SearchData
        :dataDetails="filteredData"
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
import sparcInfoData from "../../assets/sparcInfoData.json";

export default {
  components: { SearchData, FilterData, DisplayData },
  props: [ "category", "payload" ],
  data: () => {
    return {
      isLoadingSearch: false,
      originalData: [],
      currentData: [],
      searchedData: [],
      filteredData: [],
      file_type: [],
      errorMessage: '',
    }
  },

  created: function() {
    // when open find data page, call the function to fetch the data
    this.dataChange(this.$route.query.type)
  },

  watch: {
    // if the type variable in the url changes, change the current data to the data in that category
    '$route.query.type': function(val) {
      this.dataChange(val)
    },
  },

  methods: {
    async dataChange(val) {
      this.isLoadingSearch = true
      if (val === 'tools') {
        this.originalData = dummyData;
      }
      else if (val === 'news') {
        const path = `${process.env.query_api_url}records/slide`;
        let payload2 = {
          program: "demo1",
          project: "12L",
          format: "json",
        }
        await axios
          .post(path, payload2)
          .then((res) => {
            if (res.data.error)
              this.errorMessage = res.data.error
            else {
              this.originalData = res.data.data

              // find out which types of tissue exist & sort the list
              this.file_type = Array.from(new Set(this.originalData.map((data, index) =>{
                return data.file_type
              }))).sort()

              // remove the undefined data
              const nullIndex = this.file_type.findIndex(item => item == undefined);
              if (nullIndex !== -1)
                this.file_type.splice(nullIndex, 1);
            }
          })
          .catch((err) => {
            console.log(err);
            this.originalData = [];
          });
      }
      else if (val === 'laboursInfo') {
        this.originalData = sparcInfoData;
      }
      else {
        const path = `${process.env.query_api_url}records/dataset_description`;
        let payload2 = {
          program: "demo1",
          project: "12L",
          format: "json",
        }
        await axios
          .post(path, payload2)
          .then((res) => {
            this.originalData = res.data.data;

            // find out which types of file exist & sort the list
            this.file_type = Array.from(new Set(this.originalData.map((data, index) =>{
              return data.file_type
            }))).sort()

            // remove the undefined data
            const nullIndex = this.file_type.findIndex(item => item == undefined);
            if (nullIndex !== -1)
              this.file_type.splice(nullIndex, 1);
          })
          .catch((err) => {
            console.log(err);
            this.originalData = [];
          });

        // this.originalData = [
        //   {
        //     experiments: {
        //       node_id: '123',
        //     },
        //     title: 'title1',
        //   },
        //   {
        //     experiments: {
        //       node_id: '456',
        //     },
        //     title: 'title2',
        //   },
        // ]
      }

      // update the searchedData & filteredData to the originalData
      this.currentData = this.originalData;
      this.searchedData = this.originalData;
      this.filteredData = this.originalData;
      this.isLoadingSearch = false;
    },

    // update the data after search & filter
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
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 1em;
}
</style>