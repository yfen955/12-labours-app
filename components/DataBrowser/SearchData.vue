<template>
  <div class="search-container">
    <el-form label-position="top" v-model="searchContent" @submit.native.prevent>
      <el-form-item label="Search within category">
        <div class="search-title">
          <div class="input-wrap">
            <el-input
              v-model="searchContent"
              placeholder="Enter search criteria"
              @keyup.enter.native="onSubmit"
            />
            <el-button
              v-if="searchContent"
              class="btn-clear-search"
              icon="el-icon-close"
              @click="clearSearch"
            />
          </div>
          
          <el-button icon="el-icon-search" class="search-btn" @click="onSubmit()">
            Search
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import backendQuery from '@/services/backendQuery';

export default {
  props: [ "dataDetails", "currentFilterDict" ],
  data() {
    return {
      searchContent: '',
    }
  },

  methods: {
    async onSubmit() {
      let result = await backendQuery.fetchGraphqlData('experiment', this.currentFilterDict, this.searchContent, this.$route.query.limit, this.$route.query.page);
      let matchData = result[0];
      let newTotalCount = result[1];
      this.$emit('matchData', matchData, newTotalCount);
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
  margin-top: 1em;
}
.search-title {
  display: flex;
  position: relative;
}
.input-wrap {
  display: flex;
  position: relative;
  width: 100%;
  border-radius: .2rem;
  margin-right: 0.5rem;
  
  ::v-deep .el-input__inner {
    width: 100%;
  }
}
.btn-clear-search {
  color: black;
  background: none;
  border: none;
  cursor: pointer;
  height: 100%;
  outline: none;
  padding: .5em;
  position: absolute;
  right: 0;
  top: 0;
  &:hover,
  &:active {
    opacity: 0.75;
  }
}
.search-btn {
  margin-left: 1em;
  height: 2.2em;
}
</style>