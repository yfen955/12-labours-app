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
      console.log(this.searchContent);
      const textList = this.searchContent.split(' ');
      const matchData = this.currentData.filter((data, index) => {
        let organIndex = textList.findIndex(item => item.toLowerCase() === (data.Organ.toLowerCase()))
        let noteIndex = textList.findIndex(item => item.toLowerCase() === (data.Note.toLowerCase()))
        let speciesIndex = textList.findIndex(item => item.toLowerCase() === (data.Species.toLowerCase()))
        if (organIndex !== -1 || noteIndex !== -1 || speciesIndex !== -1)
          return data
      })
      console.log(matchData);
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