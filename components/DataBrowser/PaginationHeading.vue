<template>
  <el-row class="data-heading">
    <p v-show="!isLoadingSearch && totalCount">
      {{ totalCount }} Results | Showing
    </p>
    <pagination
      :total-count="totalCount"
      :page-size="limit"
      @select-page="handleCurrentChange">
    </pagination>
  </el-row>
</template>

<script>
export default {
  name: "PaginationHeading",
  props: [ "isLoadingSearch", "totalCount", "limit" ],
  data: () => {
    return {
      currentPage: 1,
    }
  },

  methods: {
    // update the page and first data
    handleCurrentChange(val) {
      this.currentPage = val;
      this.$emit('pageChange', this.currentPage);
    },
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