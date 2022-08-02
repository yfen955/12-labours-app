<template>
  <div>
    <!-- data summary -->
    <el-row class="search-heading">
      <p v-show="!isLoadingSearch && dataDetails.length">
        {{ dataDetails.length }} Results | Showing
      </p>
      <el-pagination
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
        v-for="item in dataShowed"
        :key="item.id"
        :gutter="20"
        class="data-details"
      >
        <el-col :span="6">{{ item.img }}</el-col>
        <el-col :span="18">
          <el-row>
            {{ item.Blackfynn_dataset }}
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
          <!-- <el-descriptions column="1">
            <el-descriptions-item label="Discover">
              {{ item.Discover }}
            </el-descriptions-item>
            <el-descriptions-item label="Last modified">
              {{ item.Last_modified }}
            </el-descriptions-item>
            <el-descriptions-item label="Note">
              {{ item.Note }}
            </el-descriptions-item>
            <el-descriptions-item label="Organ">
              {{ item.Organ }}
            </el-descriptions-item>
            <el-descriptions-item label="Published">
              {{ item.Published }}
            </el-descriptions-item>
            <el-descriptions-item label="Species">
              {{ item.Species }}
            </el-descriptions-item>
          </el-descriptions> -->
        </el-col>
        <hr />
      </el-row>
    </el-row>
  </div>
</template>

<script>
import dataDetails from "../../assets/spreadsheet.json";

export default {
  name: "DisplayData",
  props: [ "isLoadingSearch" ],
  data: () => {
    return {
      limit: 10,
      currentPage: 1,
      dataDetails,
      dataShowed: dataDetails.slice(0, 10),
    }
  },
  
  methods: {
    handleSizeChange(val) {
      this.limit = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      const currentFirstData = (val - 1) * this.limit;
      this.dataShowed = dataDetails.slice(currentFirstData, currentFirstData + this.limit);
    },
  },
}
</script>

<style scoped lang="scss">
.search-heading {
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
  el-pagination {
    font-size: 0.875em;
    flex-shrink: 0;
  }
}
.data-container {
  border: 1px solid #ececee;
}
.data-details {
  padding: 1em;
}
hr {
  border: .5px solid #E4E7ED;
  margin-top: 1em;
  margin-bottom: 0;
}
</style>