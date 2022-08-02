<template>
  <div class="search-bar__container">
    <h4>Search within category</h4>
    <div class="input-wrap">
        <el-input type="text" autocomplete="off" placeholder="Enter search criteria" />
        <el-button class="btn-submit-search" icon="el-icon-search">
            Search
        </el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.search-bar__container {
  margin-top: 1em;
  padding: 0.75rem;
  border: 0.1rem solid #e4e7ed;
  background: white;
  h4 {
    line-height: 1rem;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0 0 1rem;
  }
  div.el-input {
    margin-right: .5rem;
  }
}
.input-wrap {
  display: flex;
  position: relative;
  width: 100%;
  border-radius: .2rem;
  margin-right: 0.5rem;
}
.btn-submit-search {
  background: #8300bf;
  border: 1px solid #8300bf;
  box-sizing: border-box;
  color: #fff;
  font-size: .875rem;
  font-family: sans-serif;
  font-weight: 500;
  height: 2.5rem;
  padding: 0 1.5rem;
  @media screen and (max-width: 28rem) {
    padding: 0 .5rem;
    span {
      display: none;
    }
  }
}
</style>