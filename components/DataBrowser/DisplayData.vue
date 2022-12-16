<template>
  <div>
    <div v-if="(dataDetails.length > 0)">
      <!-- data summary -->
      <PaginationHeading
        :isLoadingSearch="isLoadingSearch"
        :totalCount="totalCount"
      />
      <!-- data details -->
      <div class="data-container">
        <div
          v-for="(item, index) in dataDetails"
          :key="index"
        >
          <!-- display dataset -->
          <span v-if="$route.query.type === 'dataset'">
            <section class="element">
              <img :src="imgPlaceholder" v-if="!item.dataset_descriptions[0].img">
              <p v-else>{{ item.dataset_descriptions[0].img }}</p>
              <section class="content">
                <div>
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
                </div>
                <div>
                  <strong>Anatomical Structure</strong>
                  {{ displayKeywords(item.dataset_descriptions[0].study_organ_system) }}
                </div>
                <div>
                  <strong>Keywords</strong>
                  {{ displayKeywords(item.dataset_descriptions[0].keywords) }}
                </div>
                <div>
                  <div v-if="item.dataset_descriptions[0].number_of_samples>0||item.dataset_descriptions[0].number_of_subjects>0">
                    <strong>Samples</strong>
                    {{item.dataset_descriptions[0].number_of_samples}} samples out of {{item.dataset_descriptions[0].number_of_subjects}} objects
                  </div>
                </div>
              </section>
            </section>
            <hr/>
          </span>

          <!-- display tools -->
          <span v-if="$route.query.type === 'tools'"></span>
          
          <!-- display news -->
          <span v-if="$route.query.type === 'news'"></span>

          <!-- display 12 labours information -->
          <span v-if="$route.query.type === 'laboursInfo'"></span>

        </div>
      </div>
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
      if (keywords) {
        let result = "";
        for (let i = 0; i < keywords.length; i++) {
          result += ", " + keywords[i];
        }
        result = result.slice(2);
        return result;
      }
      
    }
  },
}
</script>

<style scoped lang="scss">
.data-container {
  border: 1px solid #E4E7ED;
  padding: 1rem;
  @media only screen and (max-width: $viewport-sm) {
    overflow: auto;
    white-space: normal;
  }
  .element {
    display: flex;
    align-items: flex-start;
    @media only screen and (max-width: 37rem) {
      width: 27rem;
    }
    padding: 1rem;
    img, p {
      width: 10rem
    }
    .content {
      margin-left: 1rem;
      line-height: 2rem;
    }
  }
}
hr {
  border: 1px solid #E4E7ED;
  @media only screen and (max-width: 37rem) {
    width: 27rem
  }
}
.no-result {
  height: 10rem;
  margin: 1rem;
  white-space: nowrap;
  text-align: center;
  @media only screen and (min-width: $viewport-sm) {
    padding: 0 10rem 0 10rem;
    @media only screen and (min-width: $viewport-md) {
      padding: 0 15rem 0 15rem;
      @media only screen and (min-width: 77rem) {
        padding: 0 20rem 0 20rem;
        @media only screen and (min-width: 90rem) {
          padding: 0 25rem 0 25rem;
        }
      }
    }
  }
  p {
    color: #e4e7ed;
    font-size: 2rem;
  }
}
.title-link {
  font-size: 1.5rem;
}
</style>