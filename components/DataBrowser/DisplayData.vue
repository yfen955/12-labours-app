<template>
  <div>
    <!-- data summary -->
    <el-row class="data-heading">
      <p v-show="!isLoadingSearch && dataDetails.length">
        {{ dataDetails.length }} Results | Showing
      </p>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="limit"
        layout="sizes, prev, pager, next"
        :total="dataDetails.length">
      </el-pagination>
    </el-row>
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
    <el-row class="data-heading">
      <p v-show="!isLoadingSearch && dataDetails.length">
        {{ dataDetails.length }} Results | Showing
      </p>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="limit"
        layout="sizes, prev, pager, next"
        :total="dataDetails.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "DisplayData",
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
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.currentFirstData = (val - 1) * this.limit;
    },
  },
}
</script>

<style scoped lang="scss">
.data-heading {
  align-items: center;
  display: flex;
  margin-top: 2em;
  margin-bottom: 1em;
  justify-content: space-between;
  @media screen and (max-width: 28em) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 0;
  }
  p {
    font-size: 0.875em;
    flex-shrink: 0;
    margin-left: 0;
  }
}
el-pagination {
  font-size: 0.875em;
  flex-shrink: 0;
}
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