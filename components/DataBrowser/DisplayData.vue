<template>
  <div>
    <div v-if="dataDetails.length > 0">
      <!-- data details -->
      <div class="data-container">
        <div v-for="(item, index) in dataDetails" :key="index">
          <!-- display dataset -->
          <span v-if="$route.query.type === 'dataset'">
            <section class="element">
              <div class="dataset-img">
                <img
                  :src="getDatasetImg(item)"
                  @error="replaceByDefaultImage"
                  alt="image"
                />
              </div>

              <section class="content">
                <div>
                  <nuxt-link
                    class="title-link"
                    :to="{
                      name: 'data-browser-dataset-id',
                      params: {
                        id: item.datasetId,
                      },
                      query: {
                        datasetTab: 'abstract',
                      },
                    }"
                  >
                    {{ item.name }}
                  </nuxt-link>
                </div>
                <div>
                  <strong>Dataset ID</strong>
                  {{ item.datasetId }}
                </div>
                <div>
                  <strong>Anatomical Structure</strong>
                  {{ displayKeywords(item.organs) }}
                </div>
                <div>
                  <strong>Keywords</strong>
                  {{ displayKeywords(item.keywords) }}
                </div>
                <div v-if="item.numberSamples > 0 || item.numberSubjects > 0">
                  <strong>Samples</strong>
                  {{ item.numberSamples }}
                  {{ item.numberSamples > 1 ? "samples" : "sample" }} out of
                  {{ item.numberSubjects }}
                  {{ item.numberSubjects > 1 ? "subjects" : "subject" }}
                </div>
              </section>
            </section>
            <hr />
          </span>

          <!-- display tools -->
          <span v-if="$route.query.type === 'tools'"></span>

          <!-- display news -->
          <span v-if="$route.query.type === 'news'"></span>

          <!-- display 12 labours information -->
          <span v-if="$route.query.type === 'laboursInfo'"></span>
        </div>
      </div>
    </div>
    <div v-else class="no-result">
      <p>No result</p>
    </div>
  </div>
</template>

<script>
import backendQuery from "@/services/backendQuery";

export default {
  name: "DisplayData",
  props: ["dataDetails"],
  data: () => {
    return {
      dataShowed: [],
      imgPlaceholder: require("../../static/img/12-labours-logo-black.png"),
    };
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
    },

    getDatasetImg(item) {
      let url;
      const endpoint = this.$config.query_api_url;
      const oneOffToken = backendQuery.getLocalStorage("one_off_token");
      if (item.scaffoldViews.length > 0) {
        url = endpoint + item.scaffoldViews[0].image_url + `?token=${oneOffToken}`;
      } else if (item.thumbnails.length > 0) {
        url = endpoint + item.thumbnails[0].image_url + `?token=${oneOffToken}`;
      } else {
        url = this.imgPlaceholder;
      }
      return url;
    },

    replaceByDefaultImage(error) {
      error.target.src = this.imgPlaceholder;
    },
  },
};
</script>

<style scoped lang="scss">
.data-container {
  border: 1px solid #e4e7ed;
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

    .dataset-img {
      width: 10rem;
      height: 10rem;
    }

    img,
    p {
      width: 10rem;
    }

    .content {
      margin-left: 1rem;
      line-height: 2rem;
    }
  }
}

hr {
  border: 0.25px solid #e4e7ed;

  @media only screen and (max-width: 37rem) {
    width: 27rem;
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
