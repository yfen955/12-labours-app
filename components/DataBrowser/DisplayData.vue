<template>
  <div>
    <div v-if="dataDetails.length > 0">
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
          v-for="(item, index) in dataDetails.slice(this.currentFirstData, this.currentFirstData + this.limit)"
          :key="index"
          :gutter="20"
          class="data-details"
        >
          <!-- display dataset -->
          <span v-if="$route.query.type === 'dataset'">
            <el-col :span="6">
              <img :src="imgPlaceholder" v-if="!item.img" style="width: 90%">
              <p v-else>{{ item.img }}</p>
            </el-col>
            <el-col :span="18" style="margin-bottom:1em;">
              <el-row>
                <a :href="item.Scaffoldvuer_Link">{{ item.Scaffoldvuer_Link }}</a>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Discover</strong></el-col>
                <el-col :span="16">{{ item.Discover }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Last modified</strong></el-col>
                <el-col :span="16">{{ item.Last_modified }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Note</strong></el-col>
                <el-col :span="16">{{ item.Note }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Organ</strong></el-col>
                <el-col :span="16">{{ item.Organ }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Published</strong></el-col>
                <el-col :span="16">{{ item.Published }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Species</strong></el-col>
                <el-col :span="16">{{ item.Species }}</el-col>
              </el-row>
            </el-col>
            <hr>
          </span>

          <!-- display tools -->
          <span v-if="$route.query.type === 'tools'"></span>

          <!-- display news -->
          <span v-if="$route.query.type === 'news'">
            <el-col :span="6">
              <img :src="imgPlaceholder" v-if="!item.img" style="width: 75%">
              <p v-else>{{ item.img }}</p>
            </el-col>
            <el-col :span="18" style="margin-bottom:1em;">
              <el-row><p>{{ item.submitter_id }}</p></el-row>
              <el-row><p>{{ item.biospecimen_anatomic_site }}</p></el-row>
              <el-row>
                <el-col :span="8"><strong>Composition</strong>
                </el-col>
                <el-col :span="16">{{ item.composition }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Current Weight</strong></el-col>
                <el-col :span="16">{{ item.current_weight }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><strong>Tissue Type</strong></el-col>
                <el-col :span="16">{{ item.tissue_type }}</el-col>
              </el-row>
              <el-row>
                <el-button @click="downloadFile(item.id)">Download this Metadata</el-button>
              </el-row>
            </el-col>
            <hr>
          </span>

          <!-- display 12 labours information -->
          <span v-if="$route.query.type === 'laboursInfo'"></span>
          
        </el-row>
      </el-row>
      <PaginationHeading
        :isLoadingSearch="isLoadingSearch"
        :dataDetails="dataDetails"
        :limit="limit"
        v-on:pageChange="handlePageChange"
      />
    </div>
    <div v-else class="no-result">
      <p>No result</p>
    </div>
  </div>
</template>

<script>
import PaginationHeading from "./PaginationHeading.vue"

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
        `${process.env.query_api_url}${this.payload.program}/${this.payload.project}/${id}/${this.payload.format}/download`,
        "_self"
      );
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
.no-result {
  margin: 1.5em;
  p {
    color: #E4E7ED;
    font-size: 2em;
    text-align: center;
  }
}
</style>