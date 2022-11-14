<template>
  <el-row class="data-heading">
    <p v-show="totalCount">
      {{ totalCount }} Results | Showing
      <pagination-menu 
        :page-size="limit"
        :pageSizeOptions="pageSizeOptions"
        @update-page-size="updatePageSize"
      />
    </p>
    <pagination
      :total-count="totalCount"
      :page-size="limit"
      :selected="currentPage"
      @select-page="handleCurrentChange"
    />
  </el-row>
</template>

<script>
export default {
  name: "PaginationHeading",
  props: [ "totalCount" ],
  data: () => {
    return {
      limit: 5,
      currentPage: 1,
      pageSizeOptions: [5, 10, 20, 50, 'View All']
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
          page: this.$route.query.page,
          limit: this.limit,
        }
      })
    }
  },
}
</script>

<style scoped lang="scss">
.data-heading {
  align-items: center;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 28em) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
  p {
    font-size: 0.875em;
    flex-shrink: 0;
    margin-left: 0;
  }
}
</style>