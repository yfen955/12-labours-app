<template>
  <div class="search-container">
    <el-form label-position="top" v-model="searchContent" @submit.native.prevent>
      <el-form-item label="Search within category">
        <div class="search">
          <div class="input-box">
            <el-input
              v-model="searchContent"
              placeholder="Enter search criteria"
              @keyup.enter.native="onSubmit"
            />
            <el-button
              v-if="searchContent"
              class="clear-search-btn"
              icon="el-icon-close"
              @click="clearSearch"
            />
          </div>
          <el-button icon="el-icon-search" class="search-btn" @click="onSubmit()">
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
  },

  watch: {
    'isLoading': {
      handler() {
        this.$emit('isLoading', this.isLoading);
      }
    }
  },

  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.$emit('search_content', this.searchContent);

      // update the page and search content in the url
      let query = {
        type: this.$route.query.type,
        page: 1,
        limit: this.$route.query.limit,
      };
      if (this.$route.query.facets) {
        query.facets = this.$route.query.facets;
        query.relation = this.$route.query.relation;
      }
      if (this.searchContent !== '') {
        query.search = this.searchContent;
      }
      this.$router.push({
        path: `${this.$route.path}`,
        query: query
      })
      
      this.isLoading = false;
    },

    async clearSearch() {
      this.searchContent = '';
      this.onSubmit();
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
  ::v-deep .el-input__inner {
    width: 100%;
  }
  .clear-search-btn {
  color: #000000;
  background: none;
  border: none;
  height: 100%;
  padding: 0.5rem;
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
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>