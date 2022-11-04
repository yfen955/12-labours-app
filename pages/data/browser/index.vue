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
    
    // fetch the program & project
    await this.$store.dispatch('fetchProgram');
    let program = this.$store.getters['getProgram'];
    await this.$store.dispatch('fetchProject', program);
    let project = this.$store.getters['getProject'];
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