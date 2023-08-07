<template>
  <div class="search-container">
    <el-form label-position="top" v-model="searchContent" @submit.native.prevent>
      <el-form-item label="Search within category">
        <div class="search">
          <div class="input-box">
            <el-input
              v-model="searchContent"
              placeholder="Enter search criteria"
              @keyup.enter.native="onSubmit(1)"
            />
            <el-button
              v-if="searchContent"
              class="clear-search-btn"
              icon="el-icon-close"
              @click="clearSearch"
            />
          </div>
          <el-button icon="el-icon-search" class="search-btn" @click="onSubmit(1)">
            <span class="display-ellipsis --1">Search</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: [ "currentFilterDict" ],
  data() {
    return {
      isLoading: false,
      searchContent: '',
    }
  },

  created: function() {
    this.searchContent = this.$route.query.search ? this.$route.query.search: '';
    const page = this.$route.query.page ? this.$route.query.page : 1;
    this.onSubmit(page);
  },

  watch: {
    'isLoading': {
      handler() {
        this.$emit('isLoading', this.isLoading);
      }
    },
    '$route.query.search': {
      handler(val) {
        if (val)
          this.searchContent = val ? val : '';
        else
          this.searchContent = '';
        const page = this.$route.query.page ? this.$route.query.page : 1;
        this.onSubmit(page);
      }
    },
  },

  methods: {
    async onSubmit(page) {
      this.isLoading = true;
      this.$emit('search_content', this.searchContent);

      // update the page and search content in the url
      let query = {
        type: this.$route.query.type,
        page: page,
        limit: this.$route.query.limit,
      };
      if (this.$route.query.facets) {
        query.facets = this.$route.query.facets;
        query.relation = this.$route.query.relation;
      }
      if (this.searchContent !== '')
        query.search = this.searchContent;
      if (this.$route.query.order !== 'Published(asc)')
        query.order = this.$route.query.order;
      this.$router.push({
        path: `${this.$route.path}`,
        query: query
      })
      
      this.isLoading = false;
    },

    async clearSearch() {
      this.searchContent = '';
      this.onSubmit(1);
    }
  }
}
</script>

<style scoped lang="scss">
.search-container {
  min-width: 13rem;
  margin: 1rem 0 1rem 0;
  border: 1px solid #E4E7ED;
  padding: 1rem;
}
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: $viewport-sm) {
    align-items: flex-end;
    flex-direction: column;
  }
}
.input-box {
  width: 100%;
  min-width: 13rem;
  position: relative;
  padding-top: 1rem;
  ::v-deep .el-input__inner {
    width: 100%;
  }
  .clear-search-btn {
  color: #000000;
  background: none;
  border: none;
  height: 100%;
  padding: 1.65rem 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
  &:hover,
  &:active {
    opacity: 0.5;
  }
}
}
.search-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 0.5rem;
  height: 2.5rem;
  padding: 0 1rem 0 1rem;
  margin-top: 1rem;
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
::v-deep .el-form--label-top .el-form-item__label {
  padding: 0;
}
</style>