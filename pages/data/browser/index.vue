<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <!-- display categories -->
      <div>
        <h1>Browse categories</h1>
        <tab-nav class="categories-nav"
          :tabs="searchTypes"
          :activeTab="category"
          v-on:tabClick="changeCategory"
        />
      </div>
      <!-- data container -->
      <DataContainer
        v-if="!isLoadingSearch"
        :category="category"
        :payload="payload"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
    label: '12 Labours Information',
    name: 'laboursInfo',
  }
]

export default {
  name: 'DataBrowser',
  components: { DataContainer },
  data: () => {
    return {
      pageTitle: 'Data Browser',
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'Home'
        },
        {
          to: { name: 'data' },
          label: 'DATA & MODELS'
        },
      ],
      searchTypes,
      isLoadingSearch: false,
      category: '',
      projects_list: [],
      payload: {
        program: "",
        project: "",
      },
    }
  },

  created: async function() {
    this.isLoadingSearch = true;
    // update the category to the current category in the url
    this.category = this.$route.query.type;
    
    // fetch the program
    let program = "";
    let path = `${process.env.query_api_url}program`;
    await axios
      .get(path)
      .then((res) => {
        program = res.data.program[0];
      })
      .catch((err) => {
        console.log(err);
      });

    // fetch the project
    let project = "";
    path = `${process.env.query_api_url}project/${program}`;
    await axios
      .get(path)
      .then((res) => {
        project = res.data.project[0];
      })
      .catch((err) => {
        console.log(err);
      });
    
    // update the payload
    this.payload = {
      program: program,
      project: project,
    };
    this.isLoadingSearch = false;
  },

  methods: {
    // change the category by change the variable in the url
    changeCategory(val) {
      this.$router.push({
        path: '/data/browser',
        query: {
          type: val,
          page: 1,
          limit: this.$route.query.limit,
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