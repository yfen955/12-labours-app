<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="6" class="facet-menu">
        <!-- filter data -->
        <FilterData v-on:filter-list="selectedItems" />
      </el-col>
      <el-col :span="18" v-if="$route.query.type === 'dataset'">
        <!-- display data -->
        <DisplayData :dataDetails="filteredData" />
      </el-col>
      <el-col :span="18" v-if="!isLoadingSearch && $route.query.type === 'tools'">
        <!-- display tools -->
        <DisplayTools :dataDetails="currentData" />
      </el-col>
      <el-col :span="18" v-if="!isLoadingSearch && $route.query.type === 'news'">
        <!-- display news -->
        <DisplayData :dataDetails="currentData" />
      </el-col>
      <el-col :span="18" v-if="!isLoadingSearch && $route.query.type === 'sparcInfo'">
        <!-- display sparcInfo -->
        <DisplayData :dataDetails="currentData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import FilterData from "./FilterData.vue";
import DisplayData from "./DisplayData.vue";
import DisplayTools from "./DisplayTools.vue";
import datasetData from "../../assets/datasetData.json";
import toolsData from "../../assets/toolsData.json";
import newsData from "../../assets/newsData.json";
import sparcInfoData from "../../assets/sparcInfoData.json";

export default {
  components: { FilterData, DisplayData, DisplayTools },
  props: [ "category", "projects_list" ],
  data: () => {
    return {
      isLoadingSearch: false,
      currentData: datasetData,
      filteredData: datasetData,
    }
  },

  watch: {
    '$route.query.type': async function(val) {
      this.isLoadingSearch = true
      if (val === 'tools') {
        const id = this.projects_list[1].project_id;
        const path = `https://abi-12-labours-api.herokuapp.com/project/${id}/core_metadata_collection`;
        await axios
          .get(path)
          .then((res) => {
            // console.log(res);
            this.currentData = res.data.data.core_metadata_collection
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else if (val === 'news')
        this.currentData = newsData;
      else if (val === 'sparcInfo')
        this.currentData = sparcInfoData;
      else
        this.currentData = datasetData;
      this.filteredData = this.currentData
      this.isLoadingSearch = false;
    }
  },

  methods: {
    selectedItems(species, organs) {
      if (this.category === 'dataset') {
        if (species.length > 0 && organs.length > 0) {
        this.filteredData = this.currentData.filter((data, index) => {
          let existSpecies = species.findIndex(item => item === data.Species)
          let existOrgan = organs.findIndex(item => item === data.Organ)
          if (existSpecies !== -1 && existOrgan !== -1)
            return data
        })
      } else if (species.length === 0 && organs.length > 0) {
        this.filteredData = this.currentData.filter((data, index) => {
          let existOrgan = organs.findIndex(item => item === data.Organ)
          if (existOrgan !== -1)
            return data
        })
      } else if (species.length > 0 && organs.length === 0) {
        this.filteredData = this.currentData.filter((data, index) => {
          let existSpecies = species.findIndex(item => item === data.Species)
          if (existSpecies !== -1)
            return data
        })
      } else
        this.filteredData = this.currentData
      }
    }
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 2em;
}
</style>