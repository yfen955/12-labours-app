<template>
  <div>
    <!-- data summary -->
    <PaginationHeading
      :isLoadingSearch="isLoadingSearch"
      :dataDetails="dataDetails"
      :limit="limit"
      v-on:pageChange="handlePageChange"
    />
    <!-- data details -->
    <el-row class="data-container">
      <el-row
        v-for="item in dataDetails.slice(this.currentFirstData, this.currentFirstData + this.limit)"
        :key="item.id"
        :gutter="20"
        class="data-details"
      >
        <el-col :span="6">
          <img :src="imgPlaceholder" v-if="!item.img" style="width: 90%">
          <p v-else>{{ item.img }}</p>
        </el-col>
        <el-col :span="18" style="margin-bottom:1em;">
          <el-row>
            <a :href="item.Scaffoldvuer_Link">{{ item.Scaffoldvuer_Link }}</a>
          </el-row>
          <el-row>
            <el-col :span="8">
              <strong>Discover</strong>
            </el-col>
            <el-col :span="16">
              {{ item.Discover }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <strong>Last modified</strong>
            </el-col>
            <el-col :span="16">
              {{ item.Last_modified }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <strong>Note</strong>
            </el-col>
            <el-col :span="16">
              {{ item.Note }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <strong>Organ</strong>
            </el-col>
            <el-col :span="16">
              {{ item.Organ }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <strong>Published</strong>
            </el-col>
            <el-col :span="16">
              {{ item.Published }}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <strong>Species</strong>
            </el-col>
            <el-col :span="16">
              {{ item.Species }}
            </el-col>
          </el-row>
        </el-col>
        <hr>
      </el-row>
    </el-row>
    <PaginationHeading
      :isLoadingSearch="isLoadingSearch"
      :dataDetails="dataDetails"
      :limit="limit"
      v-on:pageChange="handlePageChange"
    />
  </div>
</template>

<script>
import PaginationHeading from "./PaginationHeading.vue"

export default {
  name: "DisplayData",
  components: { PaginationHeading },
  props: [ "isLoadingSearch", "dataDetails" ],
  data: () => {
    return {
      limit: 10,
      currentPage: 1,
      dataShowed: [],
      currentFirstData: 0,
      imgPlaceholder: require("../../static/img/12-labours-logo-black.png"),
    }
  },
  
  methods: {
    handlePageChange(currentPage, currentFirstData) {
      this.currentPage = currentPage;
      this.currentFirstData = currentFirstData;
    },
  },
}
</script>

<style scoped lang="scss">
.data-container {
  border: 1px solid #ececee;
}
.data-details {
  padding: 1em;
}
hr {
  border: .5px solid #E4E7ED;
  margin-bottom: 0em;
}
</style>