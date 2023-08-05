<template>
  <div class="tool-container">
    <div v-if="toolType === 'header'">
      <span>Sort</span>
      <el-select v-model="orderBy">
        <el-option
          v-for="item in orderList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.value }}
          <i class="el-icon-check" v-if="item.value === orderBy"></i>
        </el-option>
      </el-select>
    </div>
    <div v-else></div>
    <div class="pagination" v-if="!isLoading">
      <div>
        <span v-if="totalCount">{{ totalCount }} Results | Showing</span>
        <span v-else>Results | Showing</span>
        <pagination-menu
          :page-size="limit"
          :pageSizeOptions="pageSizeOptions"
          @update-page-size="handlePageSize"
        />
      </div>
      <div>
        <pagination
          :total-count="totalCount"
          :page-size="limit"
          :selected="page"
          @select-page="handlePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationTool",
  props: ["isLoading", "totalCount", "toolType"],
  data: () => {
    return {
      limit: 10,
      page: 1,
      pageSizeOptions: [10, 20, 50, "View All"],
      orderBy: "Published(asc)",
      orderList: [
        { value: "Published(asc)" },
        { value: "Published(desc)" },
        { value: "Title(asc)" },
        { value: "Title(desc)" },
        { value: "Relevance" },
      ],
    };
  },

  created: function() {
    this.handlePageSize(this.$route.query.limit, true);
    this.handlePage(this.$route.query.page);
    this.handleOrder(this.$route.query.order);
  },

  watch: {
    "$route.query.order": {
      handler(val) {
        this.handleOrder(val);
      },
    },

    orderBy: {
      handler() {
        this.$emit("order", this.orderBy);
      },
    },
  },

  methods: {
    // update the page and first data
    handlePage(val) {
      const intPage = parseInt(val);
      console.log("page change");
      this.page = intPage;
      this.$emit("page-limit", this.page, this.limit);
    },

    handlePageSize(val, created = false) {
      const intLimit = val === "View All" ? 100 : parseInt(val);
      console.log("limit change");
      this.limit = intLimit;
      if (!created) {
        this.handlePage(1);
      }
    },

    handleOrder(val) {
      if (JSON.stringify(this.orderList).includes(val)) {
        this.orderBy = val;
      } else {
        this.orderBy = "Published(asc)";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tool-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.el-select {
  width: 11rem;
  margin-left: 0.5rem;
  padding: 1rem 0;
}

.el-icon-check {
  color: $app-primary-color;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: $viewport-sm) {
    margin-top: 1rem;
    flex-direction: column;
  }
}
</style>
