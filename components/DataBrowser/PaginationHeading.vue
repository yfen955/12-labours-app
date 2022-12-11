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
      this.$router.replace({
        path: '/data/browser',
        query: {
          type: this.$route.query.type,
          page: val,
          limit: this.$route.query.limit,
        }
      })
      this.$emit('pageChange', this.currentPage);
    },

    updatePageSize(val) {
      this.limit = val === 'View All' ?  100 : val;
      this.$router.replace({
        path: '/data/browser',
        query: {
          type: this.$route.query.type,
          page: 1,
          limit: this.limit,
        }
      })
    }
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