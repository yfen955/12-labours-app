<template>
  <div class="search-container">
    <el-form label-position="top" v-model="searchContent" @submit.native.prevent>
      <el-form-item label="Search within category">
        <div class="search-title">
          <el-input v-model="searchContent" placeholder="Enter search criteria" @keyup.enter.native="onSubmit">
          </el-input>
          <el-button icon="el-icon-search" class="search-btn" @click="onSubmit">
            Search
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: [ "currentData" ],
  data() {
    return {
      searchContent: '',
    }
  },

  methods: {
    onSubmit() {
      let matchData = this.currentData;
      if (this.searchContent !== "") {
        const textList = this.searchContent.toLowerCase().split(' ');
        matchData = this.currentData.filter((data, index) => {
          let count = 0;
          for (let i in textList) {
            for (let key in data) {
              let value = data[key]
              if (typeof(value) == 'string') {
                if (value.toLowerCase().includes(textList[i])) {
                  count += 1;
                  break
                }
              }
            }
          }
          if (count === textList.length) {
            return data
          }
        })
      }
      this.$emit('matchData', matchData);
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