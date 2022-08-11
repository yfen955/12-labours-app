<template>
  <div>
    <!-- display dataset -->
    <el-row :gutter="24" v-if="!isLoadingSearch && $route.query.type === 'dataset'">
      <el-col :span="6" class="facet-menu">
        <FilterData v-on:filter-list="selectedDataTypes" />
      </el-col>
      <el-col :span="18">
        <DisplayData :dataDetails="filteredData" :isLoadingSearch="isLoadingSearch" />
      </el-col>
    </el-row>
    <!-- display tools -->
    <el-row :gutter="24" v-if="!isLoadingSearch && $route.query.type === 'tools'">
      <el-col :span="6" class="facet-menu">
        <FilterData v-on:filter-list="selectedDataTypes" />
      </el-col>
      <el-col :span="18">
        <DisplayTools :dataDetails="currentData" :isLoadingSearch="isLoadingSearch" />
      </el-col>
    </el-row>
    <!-- display news -->
    <el-row :gutter="24" v-if="!isLoadingSearch && $route.query.type === 'news'">
      <el-col :span="6" class="facet-menu">
        <FilterNews v-on:filter-list="filterTissues" :tissues_type="tissues_type" />
      </el-col>
      <el-col :span="18">
        <!-- <DisplayData :dataDetails="currentData" /> -->
        <span v-if="errorMessage === ''">
          <DisplayNews :dataDetails="filteredData" :isLoadingSearch="isLoadingSearch" :payload="payload" />
        </span>
        <span v-else>{{errorMessage}}</span>
      </el-col>
    </el-row>
    <!-- display sparcInfo -->
    <el-row :gutter="24" v-if="!isLoadingSearch && $route.query.type === 'sparcInfo'">
      <el-col :span="6" class="facet-menu">
        <FilterData v-on:filter-list="selectedDataTypes" />
      </el-col>
      <el-col :span="18">
        <DisplayData :dataDetails="currentData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import DisplayData from "./DisplayData.vue";
import DisplayTools from "./DisplayTools.vue";
import DisplayNews from "./DisplayNews.vue";
import datasetData from "../../assets/datasetData.json";
import sparcInfoData from "../../assets/sparcInfoData.json";
import FilterData from "./FilterData.vue";
import FilterNews from "./FilterNews.vue";

export default {
  components: { DisplayData, DisplayTools, DisplayNews, FilterData, FilterNews },
  props: [ "category", "payload" ],
  data: () => {
    return {
      isLoadingSearch: false,
      currentData: datasetData,
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
      this.filteredData = this.currentData
      this.isLoadingSearch = false;
    }
  },

  methods: {
    async filterTissues(item_list) {
      if (item_list.length > 0) {
        const listStr = '[' + item_list.map((item, index) => {return `"${item}"`}) + ']';
        const newPayload = {
          node_type: "sample",
          condition:
            `project_id: ["demo1-jenkins"], tissue_type: ${listStr}`,
          field:
            "id submitter_id biospecimen_anatomic_site composition sample_type tissue_type tumor_code",
        };
        axios
          .post(`https://abi-12-labours-api.herokuapp.com/graphql`, newPayload)
          .then((res) => {
            console.log(res.data.data.sample);
            this.filteredData = res.data.data.sample;
          })
          .catch((err) => {
            console.log(err);
          });
      } else
        this.filteredData = this.currentData;
      
    },

    selectedDataTypes(species, organs) {
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
    },

    selectedNewsTypes(tissues) {
      if (tissues.length > 0) {
        this.filteredData = this.currentData.filter((data, index) => {
          let existTissue = tissues.findIndex(item => item === data.tissue_type)
          if (existTissue !== -1)
            return data
        })
      } else
        this.filteredData = this.currentData
    }
  },
}
</script>

<style scoped lang="scss">
.facet-menu {
  margin-top: 1em;
}
</style>