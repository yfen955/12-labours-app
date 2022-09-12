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
        program: "demo1",
        project: "12L",
        format: "json",
      },
    }
  },

  created: async function() {
    // // fetch the payload
    // this.isLoadingSearch = true
    // const path = `${process.env.query_api_url}${this.program}/project`;
    // await axios
    //   .get(path)
    //   .then((res) => {
    //     this.projects_list = res.data.project
    //     this.isLoadingSearch = false
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // this.payload = {
    //     program: this.program,
    //     project: this.projects_list[1],
    //     format: this.format,
    //   };

    // update the category to the current category in the url
    this.category = this.$route.query.type;
  },

  methods: {
    // change the category by change the variable in the url
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