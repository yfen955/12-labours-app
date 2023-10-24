<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="title" />
    <!-- loading -->
    <div
      v-if="isLoading"
      v-loading="isLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      class="loading-container"
    ></div>

    <div class="container-default" v-if="!isLoading">
      <div class="right-column">
        <HeaderInfo :detail_data="detail_data" :title="title" />

        <el-card shadow="never" class="detail-container">
          <tab-nav
            class="categories-nav"
            :tabs="datasetTabs"
            :activeTab="currentTab"
            v-on:tabClick="changeTab"
          />

          <!-- abstract content -->
          <span
            v-if="$route.query.datasetTab === 'abstract'"
            class="tab-content"
          >
            <AbstractInfo
              :detail_data="detail_data"
              :facets_dict="facets_dict"
            />
          </span>

          <!-- about content -->
          <span v-if="$route.query.datasetTab === 'about'" class="tab-content">
            <AboutInfo :detail_data="detail_data" :title="title" />
          </span>

          <!-- cite content -->
          <span v-if="$route.query.datasetTab === 'cite'" class="tab-content">
            <CiteInfo :identifier="detail_data.identifier" />
          </span>

          <!-- files content -->
          <span v-if="$route.query.datasetTab === 'files'" class="tab-content">
            <h2>Dataset Files</h2>
            <DatasetFiles />
          </span>

          <!-- gallery content -->
          <span
            v-if="$route.query.datasetTab === 'gallery'"
            class="tab-content"
          >
            <carousel-card
              :cards="cards_list"
              :all_models="all_models"
              v-if="!isLoading"
              @cardInfo="viewContent"
            />
          </span>

          <!-- references content -->
          <span
            v-if="$route.query.datasetTab === 'references'"
            class="tab-content"
          >
            references
          </span>

          <!-- versions content -->
          <span
            v-if="$route.query.datasetTab === 'versions'"
            class="tab-content"
          >
            versions
          </span>
        </el-card>
      </div>

      <RelatedInfo
        :detail_data="detail_data"
        :datasetImage="datasetImage"
        :imagePlaceholder="imagePlaceholder"
        :facets_dict="facets_dict"
      />
    </div>
  </div>
</template>

<script>
import backendQuery from "@/services/backendQuery";
import HeaderInfo from "../../../../components/DatasetDetails/HeaderInfo.vue";
import AbstractInfo from "../../../../components/DatasetDetails/AbstractInfo.vue";
import AboutInfo from "../../../../components/DatasetDetails/AboutInfo.vue";
import CiteInfo from "../../../../components/DatasetDetails/CiteInfo.vue";
import DatasetFiles from "../../../../components/DatasetDetails/DatasetFiles.vue";
import RelatedInfo from "../../../../components/DatasetDetails/RelatedInfo.vue";

const datasetTabs = [
  {
    label: "Abstract",
    name: "abstract",
  },
  {
    label: "About",
    name: "about",
  },
  {
    label: "Cite",
    name: "cite",
  },
  {
    label: "Files",
    name: "files",
  },
  {
    label: "Gallery",
    name: "gallery",
  },
  // {
  //   label: 'References',
  //   name: 'references',
  // },
  // {
  //   label: 'Versions',
  //   name: 'versions',
  // }
];

export default {
  name: "DataDetails",
  props: ["id"],
  components: {
    HeaderInfo,
    AbstractInfo,
    AboutInfo,
    CiteInfo,
    DatasetFiles,
    RelatedInfo,
  },
  data: () => {
    return {
      breadcrumb: [
        {
          to: { name: "index" },
          label: "Home",
        },
        {
          to: { name: "data" },
          label: "Data & Models",
        },
        {
          to: {
            name: "data-browser",
            query: {
              type: "dataset",
              page: 1,
              limit: 10,
            },
          },
          label: "Data Browser",
        },
      ],
      isLoading: true,
      datasetTabs,
      imagePlaceholder: require("../../../../static/img/12-labours-logo-black.png"),
      detail_data: {},
      title: "",
      scaffold_view_data: [],
      thumbnail_data: [],
      spotlight_cards_list: [],
      cards_list: [],
      all_models: undefined,
      datasetImage: "",
      facets_dict: {},
      flatmap_data: [],
      // show_segmentation: false,
      // show_pdf: false,
    };
  },

  created: async function() {
    if (process.client) {
      const result = await backendQuery.fetchQueryData(
        this.$config.query_api_url,
        "experiment_query",
        { submitter_id: [this.$route.params.id] },
        "",
        "detail",
        this.$config.query_access_token
      );
      if (result.facet)
        this.handleFacets(result.facet);
      if (result.detail) {
        this.detail_data = result.detail;
        this.title = this.detail_data.name;
        this.scaffold_view_data = this.detail_data.scaffoldViews;
        this.thumbnail_data = this.detail_data.thumbnails;
        this.getDatasetImage();

        if (this.facets_dict.Species && this.facets_dict.Species.length > 0)
          this.handleFlatmapData();
        const cardsData = {
          Scaffold: this.detail_data.scaffoldViews,
          Flatmap: this.flatmap_data,
          Plot: this.detail_data.plots,
          Thumbnail: this.detail_data.thumbnails,
          MRI: this.detail_data.mris,
          DICOM: this.detail_data.dicomImages,
        };
        this.handleCards(cardsData);
      }
      // this.show_pdf = false;
      this.isLoading = false;
    }
  },

  mounted() {
    this.show_pdf = false;
    this.updateScroll();
  },

  computed: {
    currentTab: function() {
      return this.$route.query.datasetTab;
    },
  },

  watch: {
    show_pdf: {
      handler() {
        this.updateScroll();
      },
    },
  },

  methods: {
    changeTab(val, jump = false) {
      let query = { datasetTab: val };
      if (this.$route.query.path && this.$route.query.path !== "files")
        query.path = this.$route.query.path;
      else if (val === "files" && !this.$route.query.path) query.path = "files";
      this.$router.push({
        path: this.$route.path,
        query: query,
      });
      if (jump) {
        this.$el
          .querySelector(".detail-container")
          .scrollIntoView({ behavior: "smooth" });
      }
    },

    modifyLink(i) {
      let link = this.detail_data.contributor_orcids[i];
      if (!link.includes("http")) {
        link = "https://orcid.org/" + link;
      }
      return link;
    },

    generateImage(img_url) {
      const oneOffToken = backendQuery.getLocalStorage("one_off_token");
      let url = `${this.$config.query_api_url}${img_url}?token=${oneOffToken}`;
      return url;
    },

    handleCards(allCards) {
      this.spotlight_cards_list = [];
      this.cards_list = [];
      let model_set = new Set();
      for (const cardType in allCards) {
        const cards = allCards[cardType];
        cards.forEach((element) => {
          model_set.add(cardType);
          const card = {
            type: cardType,
            url:
              cardType === "Scaffold" || cardType === "Thumbnail"
                ? this.generateImage(element.image_url)
                : "",
            filename: element.name,
            id: element.identifier,
          };
          if (element.additional_metadata) {
            const spotlight =
              JSON.parse(
                element.additional_metadata
                  .replace("True", "'True'")
                  .replace(/'/g, '"')
              ).spotlight == "True";
            if (spotlight) {
              this.spotlight_cards_list.push(card);
            }
          } else {
            this.cards_list.push(card);
          }
        });
      }
      this.all_models = model_set;
      this.cards_list = [...this.spotlight_cards_list, ...this.cards_list];
    },

    getDatasetImage() {
      if (this.scaffold_view_data.length > 0)
        this.datasetImage = this.generateImage(this.scaffold_view_data[0].image_url);
      else if (this.thumbnail_data.length > 0)
        this.datasetImage = this.generateImage(this.thumbnail_data[0].image_url);
      else
        this.datasetImage = this.imagePlaceholder;
    },

    // changeShowState(val) {
    //   if (val === "show_segmentation") {
    //     this.show_segmentation = !this.show_segmentation;
    //   } else if (val === "show_pdf") {
    //     this.show_pdf = !this.show_pdf;
    //   }
    // },

    updateScroll() {
      let mo = function(e) {
        e.preventDefault();
      };
      if (this.show_pdf) {
        document.body.style.overflow = "hidden";
        document.addEventListener("touchmove", mo, false);
      } else {
        document.body.style.overflow = "";
        document.removeEventListener("touchmove", mo, false);
      }
    },

    viewContent(type, url, uuid) {
      if (type === "Thumbnail") {
        window.open(url);
      } else if (type === "Scaffold" || type === "Flatmap") {
        let query = {
          type: type.toLowerCase(),
          id: uuid,
        };
        if (type === "Scaffold") {
          query.dataset_id = this.$route.params.id;
        }
        const route = this.$router.resolve({
          name: `data-maps`,
          query: query,
        });
        window.open(route.href);
      } else if (type === "Plot" || type === "DICOM") {
        const route = this.$router.resolve({
          name: `data-maps-${type.toLowerCase()}-id`,
          params: { id: uuid },
        });
        window.open(route.href);
      } else if (type === "MRI") {
        this.$router.push({ path: "/incomplete" });
      }
    },

    handleFlatmapData() {
      this.facets_dict.Species.forEach((item) => {
        this.flatmap_data.push({
          name: item,
          identifier: item,
          additional_metadata: null,
        });
      });
    },

    handleFacets(facets) {
      Object.keys(facets).forEach((item) => {
        this.facets_dict[item] = facets[item];
      });
    },
  },
};
</script>

<style scoped lang="scss">
.loading-container {
  min-height: 80vh;
}

::v-deep .container-default {
  @media only screen and (min-width: $viewport-sm) {
    display: flex;

    @media only screen and (min-width: calc($viewport-lg - 20rem)) {
      margin: auto;
      width: 90rem;
    }
  }

  .right-column {
    order: 2;
    min-width: 15rem;

    @media only screen and (min-width: $viewport-sm) {
      margin-left: 2rem;
      width: 70rem;
    }

    .description-container {
      padding: 1rem;

      .information-top {
        @media only screen and (min-width: $viewport-md) {
          display: flex;
          justify-content: space-between;
        }

        .description {
          margin: 1rem 1rem 1rem 0;
          width: fit-content;
        }
      }

      .information-bottom {
        margin: 1rem 0 1rem 0;
        display: flex;

        .usage {
          margin-left: 0;
        }

        .download {
          margin-right: 0;
        }
      }
    }

    .detail-container {
      margin-top: 2rem;

      @media only screen and (max-width: $viewport-sm) {
        margin-bottom: 2rem;
      }
    }
  }
}

::v-deep hr {
  border: 0.5px solid #e4e7ed;
  margin: 1rem 0 1rem 0;
}

::v-deep p {
  font-size: 1rem;
}

::v-deep h2 {
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1.5rem;
}

::v-deep a {
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.tab-content {
  line-height: 2rem;
}

.gallery-img {
  width: 10rem;
  height: 9rem;

  img {
    width: 10rem;
  }
}

.small-title {
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1.3rem;
}

.citaiton-block {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  background-color: $background;

  #copy-btn {
    background-color: transparent;
    border: none;
    color: black;
    padding: 0;
    margin: 0 1rem -0.5rem;
    font-size: 1rem;
    color: $app-primary-color;
  }

  .citation-content {
    padding: 0 1.5rem 1.5rem;
    font-size: 1rem;
  }
}

.categories-nav {
  margin-bottom: 1rem;
}

// .pdf-bg {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 10;
//   background-color: rgb(38, 38, 38, 0.7);   //$background
// }
// .view-btn {
//   background-color: rgb(0, 0, 0, 0);
//   border-color: rgb(0, 0, 0, 0);
//   color: white;
//   padding: 0;
//   margin: 1% 88%;
//   font-size: x-large;
// }
// .pdf-viewer {
//   border-radius: 10px;
//   position: fixed;
//   top: 5%;
//   left: 10%;
//   width: 80%;
//   height: 90%;
// }
// .segemtation-viewer {
//   margin: auto;
// }
</style>
