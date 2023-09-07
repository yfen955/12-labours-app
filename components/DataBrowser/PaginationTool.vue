<template>
  <div class="tool-container">
    <div>
      <span>Sort</span>
      <el-select v-model="order" @change="handleOrder">
        <el-option
          v-for="item in orderList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          {{ item.label }}
          <i class="el-icon-check" v-if="item.value === order"></i>
        </el-option>
      </el-select>
    </div>
    <div class="pagination">
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
      order: "Oldest",
      orderList: [
        { value: "Published(asc)", label: "Oldest" },
        { value: "Published(desc)", label: "Latest" },
        { value: "Title(asc)", label: "A-Z" },
        { value: "Title(desc)", label: "Z-A" },
        { value: "Relevance", label: "Relevance" },
      ],
    };
  },

  created: function() {
    this.handlePageLimit(this.$route.query.page, this.$route.query.limit);
    this.handleOrder(this.$route.query.order);
  },

  // sync two pagination toll display
  watch: {
    "$route.query.page": {
      handler() {
        this.handlePageLimit(this.$route.query.page, this.$route.query.limit);
      },
    },

    "$route.query.order": {
      handler(val) {
        this.handleOrder(val);
      },
    },
  },

  methods: {
    // handle component return data
    handlePage(val) {
      this.page = val;
      this.handlePageLimit(this.page, this.limit);
    },
    // handle component return data
    handlePageSize(val) {
      this.limit = val;
      this.handlePage(1);
    },
    // handle first render/refresh page
    // handle emit page/limit change
    handlePageLimit(page, limit) {
      this.page = parseInt(page);
      this.limit = parseInt(limit);
      this.$emit("page-limit", this.page, this.limit);
    },
    // handle page render/refresh page
    // handle component return data
    // handle emit page/limit change
    handleOrder(val) {
      if (JSON.stringify(this.orderList).includes(val)) {
        this.order = val;
      } else {
        this.order = "Published(asc)";
      }
      this.$emit("order", this.order);
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
  font-weight: 600;
  margin-left: 0.5rem;
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
