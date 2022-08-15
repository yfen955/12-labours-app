<template>
  <el-row class="data-heading">
    <p v-show="!isLoadingSearch && dataDetails.length">
      {{ dataDetails.length }} Results | Showing
    </p>
    <pagination
      :total-count="dataDetails.length"
      :page-size="limit"
      @select-page="handleCurrentChange">
    </pagination>
  </el-row>
</template>

<script>
export default {
  name: "PaginationHeading",
  props: [ "isLoadingSearch", "dataDetails", "limit" ],
  data: () => {
    return {
      currentPage: 1,
      currentFirstData: 0,
    }
  },

  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.currentFirstData = (val - 1) * this.limit;
      this.$emit('pageChange', this.currentPage, this.currentFirstData);
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