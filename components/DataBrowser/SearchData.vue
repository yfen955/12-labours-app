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
import axios from "axios";

export default {
  props: [ "dataDetails", "filterDict", "mimeTypeContent" ],
  data() {
    return {
      searchContent: '',
    }
  },

  watch: {
    searchContent(after, before) {
      this.$emit("search-content", this.searchContent)
      if (after.length === 0) {
        this.$emit('search-changed', true);
      }
    },
  },

  methods: {
    async onSubmit(originalData) {
      // let currentData = this.dataDetails;
      // let type = Object.prototype.toString.call(originalData);
      // if (type === "[object Array]") {
      //   currentData = originalData;
      // }

      let matchData = [];
      // if (this.searchContent !== "") {
      //   const textList = this.searchContent.toLowerCase().split(' ');

      //   // find out how many key words each data contains
      //   let count_list = currentData.map((data, index) => {
      //     let count = 0;
      //     for (let i in textList) {
      //       for (let key in data) {
      //         let value = data[key]
      //         if (typeof(value) == 'string') {
      //           if (value.toLowerCase().includes(textList[i])) {
      //             count += 1;
      //             break
      //           }
      //         }
      //       }
      //     }
      //     return count
      //   })

      //   // add the data to the result list
      //   // data contains most key words is added to the result list first
      //   for (let i = textList.length; i > 0; i--) {
      //     let indexs = [];

      //     // find out all the indexs of data contains [i] key word(s)
      //     let idx = count_list.indexOf(i);
      //     while (idx != -1) {
      //       indexs.push(idx);
      //       idx = count_list.indexOf(i, idx + 1);
      //     }

      //     // push the data to the result list
      //     for (let j in indexs) {
      //       matchData.push(currentData[indexs[j]]);
      //     }
      //   }
      // } else {
      //   // if search is empty, return all the data
      //   matchData = currentData;
      // }

      if (this.searchContent.length > 0) {
        let newPayload = {
          node: 'dataset_description',
          filter: this.filterDict,
          search: this.searchContent + this.mimeTypeContent,
          number: 10,
          page: 1,
        };
        const path = `${process.env.query_api_url}graphql`;
        await axios
          .post(path, newPayload)
          .then((res) => {
            matchData = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        matchData = originalData;
      }
      
      this.$emit('matchData', matchData);
    },

    clearSearch() {
      this.searchContent = '';
      this.$emit('matchData', this.dataDetails);
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