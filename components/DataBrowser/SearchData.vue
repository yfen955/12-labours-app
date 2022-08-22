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
      let matchData = [];
      if (this.searchContent !== "") {
        const textList = this.searchContent.toLowerCase().split(' ');
        let count_list = this.currentData.map((data, index) => {
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
          return count
        })
        for (let i = textList.length; i > 0; i--) {
          let indexs = [];
          let idx = count_list.indexOf(i);
          while (idx != -1) {
            indexs.push(idx);
            idx = count_list.indexOf(i, idx + 1);
          }
          for (let j in indexs) {
            matchData.push(this.currentData[indexs[j]]);
          }
        }
      } else {
        matchData = this.currentData;
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