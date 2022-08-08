<template>
  <div class="search-container">
    <el-form label-position="top">
      <el-form-item label="Search within category">
        <div class="search-title">
          <el-input v-model="value" placeholder="Enter search criteria">   
          </el-input>
          <el-button icon="el-icon-search" class="search-btn">
            Search
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
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
.search-btn {
  margin-left: 1em;
  height: 2.2em;
}
</style>