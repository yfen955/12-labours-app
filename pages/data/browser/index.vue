<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <!-- categories -->
      <div>
        <h1>Browse categories</h1>
        <tab-nav class="categories-nav" :tabs="searchTypes" :activeTab="defaultCategory" v-on:tabClick="changeCategory" />
      </div>
      <!-- search data -->
      <SearchData />
      <!-- data container -->
      <DataContainer
        v-if="!isLoadingSearch"
        :category="category"
        :projects_list="projects_list"
      />
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import SearchData from "../../../components/DataBrowser/SearchData.vue";
import DataContainer from "../../../components/DataBrowser/DataContainer.vue";

const searchTypes = [
  {
    label: 'Data',
    name: 'dataset',
  },
  {
    label: 'Tools & Resources',
    name: 'tools',
  },
  {
    label: 'News & Events',
    name: 'news',
  },
  {
    label: 'SPARC Information',
    name: 'sparcInfo',
  }
]

export default {
  name: 'DataBrowser',
  components: { SearchData, DataContainer },
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
      category: '',
      projects_list: [],
      defaultCategory: "dataset",
    }
  },

  created: async function() {
    this.isLoadingSearch = true
    const path = "https://abi-12-labours-api.herokuapp.com/project";
    await axios
      .get(path)
      .then((res) => {
        console.log(res.data);
        this.projects_list = res.data.data.project
        this.isLoadingSearch = false
      })
      .catch((err) => {
        console.log(err);
      });
    
    this.category = this.$route.query.type;
  },

  methods: {
    changeCategory(val) {
      this.$router.push({
        path: '/data/browser',
        query: {
          type: val,
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.categories-nav {
  margin-top: 1em;
  el-tab-pane {
    width: 25%;
  }
}
</style>