<template>
  <div class="tool-container">
    <div>
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
    <div class="pagination" v-if="totalCount">
      <div>
        <span>{{ totalCount }} Results | Showing</span>
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
  props: ["totalCount"],
  data: () => {
    return {
      page: 1,
      limit: 10,
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
    this.handlePageLimit(this.$route.query.page, this.$route.query.limit);
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
      this.page = val;
      this.handlePageLimit(this.page, this.limit);
    },

    handlePageSize(val) {
      this.limit = val;
      this.handlePage(1);
    },

    handlePageLimit(page, limit) {
      this.page = parseInt(page);
      this.limit = parseInt(limit);
      this.$emit("page-limit", this.page, this.limit);
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
