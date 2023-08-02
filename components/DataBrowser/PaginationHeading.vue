<template>
  <div class="pagination-container">
    <div v-show="totalCount">
      {{ totalCount }} Results | Showing
      <pagination-menu 
        :page-size="limit"
        :pageSizeOptions="pageSizeOptions"
        @update-page-size="updatePageSize"
      />
    </div>
    <div>
      <pagination
        :total-count="totalCount"
        :page-size="limit"
        :selected="currentPage"
        @select-page="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationHeading",
  props: [ "isLoadingSearch", "totalCount" ],
  data: () => {
    return {
      limit: 10,
      currentPage: 1,
      pageSizeOptions: [10, 20, 50, 'View All']
    }
  },

  created: function() {
    this.limit = parseInt(this.$route.query.limit);
    this.currentPage = parseInt(this.$route.query.page);
  },

  watch: {
    '$route.query.page': function(val) {
      this.currentPage = parseInt(val);
    },
    
    '$route.query.limit': function(val) {
      this.limit = parseInt(val);
    },
  },

  methods: {
    // update the page and first data
    handleCurrentChange(val) {
      let new_query = {
        type: this.$route.query.type,
        page: val,
        limit: this.limit,
      };
      if (this.$route.query.facets) {
        new_query.facets = this.$route.query.facets;
        new_query.relation = this.$route.query.relation;
      }
      if (this.$route.query.search)
        new_query.search = this.$route.query.search;
      if (this.$route.query.order !== 'Published(asc)')
        new_query.order = this.$route.query.order;
      this.$router.push({
        path: `${this.$route.path}`,
        query: new_query
      })
    },

    updatePageSize(val) {
      this.limit = val === 'View All' ?  100 : val;
      this.handleCurrentChange(1);
    },
  },
}
</script>

<style scoped lang="scss">
.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: $viewport-sm) {
    margin-top: 1rem;
    flex-direction: column;
  }
}
</style>