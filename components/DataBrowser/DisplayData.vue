<template>
  <div>
    <div v-if="dataDetails.length > 0">
      <!-- data summary -->
      <PaginationHeading
        :isLoadingSearch="isLoadingSearch"
        :totalCount="totalCount"
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
                      uuid: item.dataset_descriptions[0].id,
                    },
                    query: {
                      datasetTab: 'abstract',
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
                  <div v-if="item.dataset_descriptions[0].number_of_samples>0&&item.dataset_descriptions[0].number_of_subjects>0">
                    <el-col :span="8"><strong>Samples</strong></el-col>
                    <el-col :span="16">
                      {{item.dataset_descriptions[0].number_of_samples}} samples out of {{item.dataset_descriptions[0].number_of_subjects}} objects
                    </el-col>
                  </div>
                </el-row>
              </el-col>
            </el-row>
            
          </span>

          <!-- display tools -->
          <span v-if="$route.query.type === 'tools'"></span>
          
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
      dataShowed: [],
      imgPlaceholder: require("../../static/img/12-labours-logo-black.png"),
    }
  },

  methods: {
    displayKeywords(keywords) {
      let result = "";
      for (let i = 0; i < keywords.length; i++) {
        result += ", " + keywords[i];
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
  height: 10em;
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