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
            <AbstractInfo :detail_data="detail_data" :species_list="species_list" :sex_list="sex_list" :age_list="age_list" />
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
            <carousel-card2
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
        :species_list="species_list"
        :sex_list="sex_list"
        :age_list="age_list"
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
  props: [ "id" ],
  components: { HeaderInfo, AbstractInfo, AboutInfo, CiteInfo, DatasetFiles, RelatedInfo },
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
      species_list: [],
      sex_list: [],
      age_list: [],
      // show_segmentation: false,
      // show_pdf: false,
    };
  },

  created: async function() {
    const result = await backendQuery.fetchQueryData(
      this.$config.query_api_url,
      "experiment_query",
      { submitter_id: [this.$route.params.id] },
      "",
      "detail"
    );
    const data = result.detail;
    this.handleFacets(result.facet);
    
    this.detail_data = data.dataset_descriptions[0];
    this.title = data.dataset_descriptions[0].title[0];

    this.scaffold_view_data = data.scaffoldViews;
    this.thumbnail_data = data.thumbnails;
    this.getDatasetImage();
    let flatmap_data = [];
    if (this.species_list.length > 0)
      flatmap_data = this.handleSpecies();

    const cardsData = {
      Scaffold: data.scaffoldViews,
      Flatmap: flatmap_data,
      Plot: data.plots,
      Thumbnail: data.thumbnails,
      MRI: data.mris,
      DICOM: data.dicomImages,
    };
    this.handleCards(cardsData);

    // this.show_pdf = false;
    this.isLoading = false;
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

    modifyName(name) {
      let name_list = name.split(", ");
      let result = name_list[1] + " " + name_list[0];
      return result;
    },

    modifyLink(i) {
      let link = this.detail_data.contributor_orcid[i];
      if (!link.includes("http")) {
        link = "https://orcid.org/" + link;
      }
      return link;
    },

    generateFilename(name) {
      let name_list = name.split("/");
      let index = name_list.length - 1;
      let fileName = name_list[index];
      return fileName;
    },

    generateImage(method, filename, is_source_of) {
      let url = `${this.$config.query_api_url}/data/${method}`;
      if (!filename.includes(this.$route.params.id)) {
        url += `/${this.$route.params.id}`;
      }
      if (is_source_of) {
        url += `/${filename.substring(
          0,
          filename.lastIndexOf("/")
        )}/${is_source_of}`;
      } else {
        url += `/${filename}`;
      }
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
                ? this.generateImage(
                    "preview",
                    element.filename,
                    element.is_source_of
                  )
                : "",
            filename: this.generateFilename(element.filename),
            id: element.id,
          };
          if (element.additional_metadata !== null) {
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
      let item = {};
      if (this.scaffold_view_data.length > 0) {
        item = this.scaffold_view_data[0];
      } else if (this.thumbnail_data.length > 0) {
        item = this.thumbnail_data[0];
      }
      if (JSON.stringify(item) === "{}") {
        this.datasetImage = this.imagePlaceholder;
      } else {
        this.datasetImage = this.generateImage(
          "preview",
          item.filename,
          item.is_source_of
        );
      }
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

    handleSpecies() {
      let flatmap_data = [];
      this.species_list.forEach((item) => {
        flatmap_data.push({
          id: item,
          filename: item,
          additional_metadata: null,
        });
      });
      return flatmap_data;
    },

    handleFacets(facets) {
      Object.keys(facets).forEach((item) => {
        if (item === "Species")
          this.species_list = facets[item];
        else if (item === "Sex")
          this.sex_list = facets[item];
        else if (item === "Age category")
          this.age_list = facets[item];
      })
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
