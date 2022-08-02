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
              to="/"
              >
              {{ type.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!-- search -->
      <SearchData />
      <div class="mb-48 container">
        <el-row :gutter="24">
          <el-col :span="6" class="facet-menu">
            <!-- filter -->
            <FilterData />
          </el-col>
          <el-col :span="18">
            <!-- data details -->
            <DisplayData :isLoadingSearch="isLoadingSearch" />
          </el-col>
        </el-row>
      </div>
    </div>
    
  </div>
</template>

<script>
import SearchData from "../../../components/DataBrowser/SearchData.vue";
import FilterData from "../../../components/DataBrowser/FilterData.vue";
import DisplayData from "../../../components/DataBrowser/DisplayData.vue";
// import dataDetails from "../../../assets/spreadsheet.json";

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
  components: { SearchData, FilterData, DisplayData },
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
            name: 'data',
            query: {
              type: 'data'
            }
          },
          label: 'Find Data'
        },
      ],
      searchTypes,
      isLoadingSearch: false,
    }
  },
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
    color: #8300bf;
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
    border-right: 0.1rem solid #8300bf;
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