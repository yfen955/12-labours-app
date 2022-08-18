<template>
  <div>
    <div v-show="dataDetails.length">
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
            <img :src="imgPlaceholder" v-if="!item.img" style="width: 75%">
            <p v-else>{{ item.img }}</p>
          </el-col>
          <el-col :span="18" style="margin-bottom:1em;">
            <el-row>
              <p>{{ item.submitter_id }}</p>
            </el-row>
            <el-row>
              <p>{{ item.biospecimen_anatomic_site }}</p>
            </el-row>
            <el-row>
              <el-col :span="8">
                <strong>Composition</strong>
              </el-col>
              <el-col :span="16">
                {{ item.composition }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <strong>Current Weight</strong>
              </el-col>
              <el-col :span="16">
                {{ item.current_weight }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <strong>Tissue Type</strong>
              </el-col>
              <el-col :span="16">
                {{ item.tissue_type }}
              </el-col>
            </el-row>
            <el-row>
              <el-button @click="downloadFile(item.id)">Download this Metadata</el-button>
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
  </div>
</template>

<script>
import PaginationHeading from "./PaginationHeading.vue"
import axios from "axios";

export default {
  name: "DisplayData",
  components: { PaginationHeading },
  props: [ "isLoadingSearch", "dataDetails", "payload" ],
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

    async downloadFile(id) {
      window.open(
        `${process.env.api_url}${this.payload.program}/${this.payload.project}/${id}/${this.payload.format}/download`,
        "_self"
      );
    }
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