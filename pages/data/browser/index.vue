<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <!-- display categories -->
      <section class="category-container">
        <h1>Browse categories</h1>
        <tab-nav class="category-nav"
          :tabs="searchTypes"
          :activeTab="category"
          v-on:tabClick="changeCategory"
        />
      </section>
      <!-- data container -->
      <DataContainer
        :category="category"
      />
    </div>
  </div>
</template>

<script>
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
  },
  {
    label: 'Workflows',
    name: 'workflows',
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
          label: 'Data & Models'
        },
      ],
      searchTypes,
      projects_list: [],
    }
  },

  watch: {
    '$route.query.type': {
      handler(val) {
        if (val === 'dataset')
          this.pageTitle = 'Data Browser';
        else if (val === 'tools')
          this.pageTitle = 'Tools & Resources';
        else if (val === 'news')
          this.pageTitle = 'News & Events';
        else if (val === 'laboursInfo')
          this.pageTitle = '12 Labours Information';
        else if (val === 'workflows')
          this.pageTitle = 'Workflows Dashboard';
      }
    },
  },

  mounted() {
    let mo = function (e) {
      e.preventDefault();
    };
    if (document.body.style.overflow = "hidden") {
      document.body.style.overflow = "";
      document.removeEventListener("touchmove", mo, false);
    }
  },

  computed: {
    category: function() {
      return this.$route.query.type;
    }
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
.category-container {
  border: 1px solid #E4E7ED;
  padding: 1rem 1rem 0 1rem;
  min-width: 13rem;
  
  .category-nav {
    margin-top: 1rem;
  }
}
.container-default {
  @media only screen and (min-width: calc($viewport-lg - 20rem)) {
    margin: auto;
    width: 90rem;
  }
}
</style>