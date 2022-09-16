<template>
  <div>
    <div v-if="dataDetails.length > 0">
      <!-- data summary -->
      <PaginationHeading
        :isLoadingSearch="isLoadingSearch"
        :totalCount="totalCount"
        v-on:pageChange="handlePageChange"
        v-on:sizeChange="handleSizeChange"
      />
      <!-- data details -->
      <el-row class="data-container">
        <el-row
          v-for="(item, index) in dataDetails"
          :key="index"
          :gutter="20"
          class="data-details"
        >
          <!-- display dataset -->
          <span v-if="$route.query.type === 'dataset'">
            <el-row>
              <el-col :span="6">
                <img :src="imgPlaceholder" v-if="!item.dataset_descriptions[0].img" style="width: 90%">
                <p v-else>{{ item.dataset_descriptions[0].img }}</p>
              </el-col>
              <el-col :span="18" style="margin-bottom: 1em">
                <el-row>
                  <nuxt-link class="title-link" :to="{
                    name: 'data-browser-dataset-id',
                    params: {
                      id: item.submitter_id,
                    }
                  }">
                    {{ item.dataset_descriptions[0].title }}
                  </nuxt-link>
                </el-row>
                <el-row>
                  <el-col :span="8"><strong>Organ</strong></el-col>
                  <el-col :span="16">{{ item.dataset_descriptions[0].study_organ_system }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><strong>Keywords</strong></el-col>
                  <el-col :span="16">{{ displayKeywords(item.dataset_descriptions[0].keywords) }}</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><strong>Samples</strong></el-col>
                  <el-col :span="16">
                    {{item.dataset_descriptions[0].number_of_samples}} samples out of {{item.dataset_descriptions[0].number_of_subjects}} objects
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            
          </span>

          <!-- display tools -->
          <span v-if="$route.query.type === 'tools'">
            <el-row>
              <el-col :span="6">
                <img :src="imgPlaceholder" v-if="!item.img" style="width: 90%">
                <p v-else>{{ item.img }}</p>
              </el-col>
              <el-col :span="18" style="margin-bottom:1em;">
                <el-row>
                  <!-- path: `/data/browser/dataset/${item.id}`, -->
                  <nuxt-link :to="{
                    name: 'data-browser-dataset-id',
                    params: {
                      'program': `${payload.program}`,
                      'project': `${payload.project}`,
                      'format': `${payload.format}`
                    }
                  }">
                    {{ item.id }}
                  </nuxt-link>
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
            </el-row>
          </span>
          

          <!-- display news -->
          <span v-if="$route.query.type === 'news'"></span>

          <!-- display 12 labours information -->
          <span v-if="$route.query.type === 'laboursInfo'"></span>
          
          <hr />
        </el-row>
      </el-row>
      <PaginationHeading
        :isLoadingSearch="isLoadingSearch"
        :totalCount="totalCount"
        v-on:pageChange="handlePageChange"
        v-on:sizeChange="handleSizeChange"
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
  props: [ "isLoadingSearch", "dataDetails", "payload", "totalCount" ],
  data: () => {
    return {
      limit: 10,
      dataShowed: [],
      imgPlaceholder: require("../../static/img/12-labours-logo-black.png"),
    }
  },

  methods: {
    handlePageChange(val) {
      this.currentPage = val;
      this.$emit('pageChange', this.currentPage);
    },

    handleSizeChange(val) {
      this.limit = val;
      this.$emit('sizeChange', this.limit);
    },

    async downloadFile(id) {
      window.open(
        `${process.env.query_api_url}${this.payload.program}/${this.payload.project}/${id}/${this.payload.format}/download`,
        "_self"
      );
    },

    displayKeywords(keywords) {
      let result = "";
      let keywords_list = keywords.split(",");
      for (let i = 0; i < keywords_list.length; i++) {
        result += ", " + keywords_list[i];
      }
      result = result.slice(2);
      return result;
    }
  },
}
</script>

<style scoped lang="scss">
.data-container {
  border: 1px solid #ececee;
  padding: 1em;
}
.data-details {
  padding: 1em 1em 0 1em;
}
hr {
  border: 1px solid #E4E7ED;
  margin-bottom: 0;
}
.no-result {
  margin: 1.5em;
  p {
    color: #E4E7ED;
    font-size: 2em;
    text-align: center;
  }
}
.title-link {
  font-size: 1em;
}
</style>