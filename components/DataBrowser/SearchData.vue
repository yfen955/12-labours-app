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
            <span class="display-ellipsis --1">Search</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: [ "currentFilterDict" ],
  data() {
    return {
      isLoading: false,
      searchContent: '',
    }
  },

  created: function() {
    this.searchContent = this.$route.query.search;
    this.onSubmit();
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
      let matched_id_list = [];
      let payload = {
        search: this.searchContent,
      };
      const path = `${process.env.query_api_url}/search`;
      await axios
        .post(path, payload)
        .then((res) => {
          matched_id_list = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.$emit('search_list', matched_id_list);

      this.$router.push({
        path: `${this.$route.path}`,
        query: {
          ...this.$route.query,
          search: this.searchContent
        }
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
  margin-top: 1em;
  margin-bottom: 0.5em;
  border: 1px solid #E4E7ED;
  padding: 0.5em;
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
  display: flex;
  margin-left: 0.5em;
  height: 2.2em;
  padding: 0.5em 1em 0.5em 1em;
}
::v-deep .el-form-item {
  margin-bottom: 0;
}
</style>