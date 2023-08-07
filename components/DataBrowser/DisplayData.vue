<template>
  <div>
    <div v-if="dataDetails.length > 0">
      <!-- data summary -->
      <div class="title-config">
        <div>
          Sort
          <el-select v-model="sortBy">
            <el-option
              v-for="item in sort_list"
              :key="item.value"
              :value="item.value">
              {{ item.value }} <i class="el-icon-check" v-if="item.value === sortBy"></i>
            </el-option>
          </el-select>
        </div>
        <PaginationHeading
          :isLoadingSearch="isLoadingSearch"
          :totalCount="totalCount"
          class="top"
        />
      </div>
      <!-- data details -->
      <div class="data-container">
        <div v-for="(item, index) in dataDetails" :key="index">
          <!-- display dataset -->
          <span v-if="$route.query.type === 'dataset'">
            <section class="element">
              <div class="dataset-img">
                <img
                  v-if="getDatasetImg(item)"
                  :src="getDatasetImg(item)"
                  @error="replaceByDefaultImage"
                  alt="image"
                />
                <img v-else :src="imgPlaceholder" alt="image" />
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
                        access: item.belong_to,
                      },
                    }"
                  >
                    {{ item.name }}
                  </nuxt-link>
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
                  {{ item.numberSamples }} samples out of
                  {{ item.numberSubjects }} objects
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
      <PaginationHeading
        :isLoadingSearch="isLoadingSearch"
        :totalCount="totalCount"
        class="bottom"
      />
    </div>
    <div v-else class="no-result">
      <p>No result</p>
    </div>
  </div>
</template>

<script>
import PaginationHeading from "./PaginationHeading.vue";

export default {
  name: "DisplayData",
  components: { PaginationHeading },
  props: ["isLoadingSearch", "dataDetails", "totalCount"],
  data: () => {
    return {
      dataShowed: [],
      imgPlaceholder: require("../../static/img/12-labours-logo-black.png"),
      sortBy: 'Published(asc)',
      sort_list: [
        {value: 'Published(asc)'},
        {value: 'Published(desc)'},
        {value: 'Title(asc)'},
        {value: 'Title(desc)'},
        {value: 'Relevance'},
      ],
    }
  },

  created: function () {
    if (this.$route.query.order)
      this.determineOrder(this.$route.query.order);
  },

  watch: {
    'sortBy': {
      handler(val) {
        if (val !== this.$route.query.order)
          this.updateUrl(1, val);
        this.$emit('sort_changed', this.sortBy);
      }
    },
    '$route.query.order': {
      handler(val) {
        if (val)
          this.determineOrder(val);
        else
          this.sortBy = 'Published(asc)';
      }
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
    },

    getDatasetImg(item) {
      let url = "";
      if (item.scaffoldViews.length > 0) {
        url = this.$config.query_api_url + item.scaffoldViews[0].image_url;
      } else if (item.thumbnails.length > 0) {
        url = this.$config.query_api_url + item.thumbnails[0].image_url;
      } else {
        url = this.imgPlaceholder;
      }
      return url;
    },

    replaceByDefaultImage(error) {
      error.target.src = this.imgPlaceholder;
    },

    determineOrder(val) {
      if (JSON.stringify(this.sort_list).includes(val))
        this.sortBy = val;
      else
        this.updateUrl(1);
    },

    updateUrl(page, order) {
      let query = {
          type: this.$route.query.type,
          page: page,
          limit: this.$route.query.limit,
        };
        if (this.$route.query.facets) {
          query.facets = this.$route.query.facets;
          query.relation = this.$route.query.relation;
        }
        if (this.$route.query.search)
          query.search = this.$route.query.search;
        if (order !== 'Published(asc)')
          query.order = order;
        this.$router.push({
          path: `${this.$route.path}`,
          query: query
        })
    }
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
.el-select {
  width: 11rem;
  margin-left: .5rem;
  padding: 1rem 0;
}
.title-config {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.el-icon-check {
  color: $app-primary-color;
}
</style>
