<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <!-- categories -->
      <div class="search-tabs__container">
        <h3>Browse categories</h3>
        <ul class="search-tabs">
          <li v-for="type in searchTypes" :key="type.label">
            <nuxt-link
              class="search-tabs__button"
              :class="{ active: type.type === $route.query.type }"
              :to="{
                path: '/data/browser',
                query: {
                  ...$route.query,
                  type: type.type,
                }
              }"
              >
              {{ type.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- search data -->
      <SearchData />
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
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import SearchData from "../../../components/DataBrowser/SearchData.vue";
import FilterData from "../../../components/DataBrowser/FilterData.vue";
import DisplayData from "../../../components/DataBrowser/DisplayData.vue";
import DisplayTools from "../../../components/DataBrowser/DisplayTools.vue";
import datasetData from "../../../assets/datasetData.json";
import toolsData from "../../../assets/toolsData.json";
import newsData from "../../../assets/newsData.json";
import sparcInfoData from "../../../assets/sparcInfoData.json";

const searchTypes = [
  {
    label: 'Data',
    type: 'dataset',
  },
  {
    label: 'Tools & Resources',
    type: 'tools',
  },
  {
    label: 'News & Events',
    type: 'news',
  },
  {
    label: 'SPARC Information',
    type: 'sparcInfo',
  }
]

export default {
  name: 'DataBrowser',
  components: { SearchData, FilterData, DisplayData, DisplayTools },
  data: () => {
    return {
      pageTitle: 'Data Browser',
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'Home'
        },
        {
          to: {
            name: 'data'
          },
          label: 'DATA & MODELS'
        },
      ],
      searchTypes,
      isLoadingSearch: false,
      currentData: datasetData,
      filteredData: datasetData,
      category: '',
      projects_list: [],
    }
  },

  created: async function() {
    this.isLoadingSearch = true
    const path = "https://abi-12-labours-api.herokuapp.com/project";
    await axios
      .get(path)
      .then((res) => {
        // console.log(res);
        this.projects_list = res.data.data.project
        this.isLoadingSearch = false
      })
      .catch((err) => {
        console.log(err);
      });
    
    this.category = this.$route.query.type;
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
  }
}
</script>

<style scoped lang="scss">
.search-tabs__container {
  margin-top: 2rem;
  padding-top: 0.5rem;
  background-color: white;
  border: 0.1rem solid #e4e7ed; // purple-gray
  h3 {
    padding-left: 0.75rem;
    font-weight: 600;
    font-size: 2rem;
    margin: 0 0 1rem;
  }
}
.search-tabs {
  display: flex;
  list-style: none;
  overflow: auto;
  margin: 0 0 0 0;
  padding: 0 0;
  outline: 0.1rem solid #8300bf; // median
  @media (max-width: 40rem) {
    display: block;
  }
  li {
    width: 100%;
    text-align: center;
    // color: #8300bf;
  }
  li:last-child > a {
    border-right: none;
  }
}
.search-tabs__button {
  background: #f9f2fc; // light-purple
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  outline: none;
  padding: 0;
  color: #8300bf !important;
  text-decoration: none !important;
  text-transform: uppercase;
  line-height: 3.5rem;
  @media (min-width: 40rem) {
    font-size: 0.65rem;
    border-right: 0.1rem solid ; // #8300bf
  }
  @media (min-width: 50rem) {
    font-size: .75rem;
  }
  @media (min-width: 64rem) {
    font-size: 1.25rem;
    font-weight: 600;
    text-transform: none;
  }
  &:hover,
  &:focus {
    color: white !important;
    background-color: #8300bf;
    font-weight: 500;
  }
  &.active {
    color: white !important;
    background-color: #8300bf;
    font-weight: 500;
  }
}
.facet-menu {
  margin-top: 2em;
}
</style>