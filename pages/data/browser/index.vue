<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <!-- display categories -->
      <div class="content-container">
        <h1>Browse categories</h1>
        <tab-nav class="category-nav"
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
const searchTypes = [
  {
    label: 'Find Data',
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
    let program = this.$store.getters['getProgram'];
    let project = this.$store.getters['getProject'];
    if (!program || !project) {
      program = await this.$store.dispatch('fetchProgram');
      project = await this.$store.dispatch('fetchProject', program);
    };
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
.container-default{
  min-height: 100vh;
}
.content-container {
  border: 1px solid #E4E7ED;
  padding: 1rem 1rem 0 1rem;
  min-width: 13rem;
  .category-nav {
    margin-top: 1rem;
  }
}
</style>