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
        <el-card shadow="never" class="description-container">
          <h1>{{ title }}</h1>
          <div class="information-top">
            <section class="description">
              <p>
                <b>Contributors: </b>
                <span
                  v-if="
                    detail_data.contributor_name.length !==
                      detail_data.contributor_orcid.length
                  "
                >
                  {{ combineNames() }}
                </span>
                <a
                  v-else
                  v-for="(name, i) in detail_data.contributor_name"
                  :key="i"
                  :href="modifyLink(i)"
                >
                  {{ modifyName(name, i) }}
                </a>
              </p>
              <hr />
              <p>
                <b>Description: </b>
                {{ detail_data.subtitle[0] }}
              </p>
            </section>
            <el-card shadow="never">
              <p><b>Dataset ID:</b> {{ $route.params.id }}</p>
              <!-- <p>
                <b>Viewing version:</b> {{ detail_data.metadata_version[0] }}
              </p> -->
              <div v-if="detail_data.identifier_type[0] === 'DOI'">
                <b>DOI: </b>
                <div
                  v-for="(item, i) in detail_data.identifier"
                  :key="i"
                  class="indent display-ellipsis --1"
                >
                  <a :href="item" target="_blank">{{ item }}</a>
                </div>
              </div>
              <!-- need more data to display these infomation -->
              <p v-if="detail_data.date">Date: {{ detail_data.date }}</p>
              <p v-if="detail_data.files">
                <i class="el-icon-document-copy"></i>
                {{ detail_data.files }} files
              </p>
              <p v-if="detail_data.size">
                <i class="el-icon-files"></i> {{ detail_data.size }} GB
              </p>
              <!-- <p>
                <b>Latest version:</b> {{ detail_data.metadata_version[0] }}
              </p> -->
              <p v-if="detail_data.date">Date: {{ detail_data.date }}</p>
              <p v-if="detail_data.other_version">View other version</p>
            </el-card>
          </div>
          <hr v-if="detail_data.download_num" />
          <div class="information-bottom" v-if="detail_data.download_num">
            <p class="usage"><b>Usage Rights:</b> N/A</p>
            <p class="download"><b>Downloads:</b> N/A</p>
          </div>
        </el-card>

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
            <p>
              <b>Study Purpose:</b>
              {{
                detail_data.study_purpose.length > 0
                  ? detail_data.study_purpose[0]
                  : "N/A"
              }}
            </p>
            <p><b>Completeness:</b> N/A</p>
            <p><b>Primary vs derivative data:</b> N/A</p>
            <p><b>Important Notes:</b> N/A</p>
            <hr />
            <h2>Metadata</h2>
            <p><b>Experimental Design:</b> N/A</p>
            <p class="indent --2"><b>Protocol Links:</b> N/A</p>
            <p class="indent --2"><b>Experimental Approach:</b> N/A</p>
            <p><b>Subject Information:</b> N/A</p>
            <p class="indent --2">
              <b>Anatomical structure:</b>
              <span v-if="detail_data.study_organ_system.length === 0"> N/A</span>
              <nobr
                v-else
                v-for="(organ, i) in detail_data.study_organ_system"
                :key="i"
              >
                <nobr v-if="i < detail_data.study_organ_system.length - 1"
                  >{{ organ[0].toUpperCase() + organ.slice(1) }},
                </nobr>
                <nobr v-else>{{
                  organ[0].toUpperCase() + organ.slice(1)
                }}</nobr>
              </nobr>
            </p>
            <p class="indent --2">
              <b>Species:</b>
              <span v-if="species_list.length === 0"> N/A</span>
              <nobr
                v-else
                v-for="(item, i) in species_list"
                :key="i"
              >
                <nobr v-if="i < species_list.length - 1" >
                  {{ item[0].toUpperCase() + item.slice(1) }},
                </nobr>
                <nobr v-else>
                  {{ item[0].toUpperCase() + item.slice(1) }}
                </nobr>
              </nobr>
            </p>
            <p class="indent --2">
              <b>Sex:</b>
              <span v-if="sex_list.length === 0"> N/A</span>
              <nobr
                v-else
                v-for="(item, i) in sex_list"
                :key="i"
              >
                <nobr v-if="i < sex_list.length - 1" >
                  {{ item[0].toUpperCase() + item.slice(1) }},
                </nobr>
                <nobr v-else>
                  {{ item[0].toUpperCase() + item.slice(1) }}
                </nobr>
              </nobr>
            </p>
            <p class="indent --2">
              <b>Age range:</b>
              <span v-if="age_list.length === 0"> N/A</span>
              <nobr
                v-else
                v-for="(item, i) in age_list"
                :key="i"
              >
                <nobr v-if="i < age_list.length - 1" >
                  {{ item[0].toUpperCase() + item.slice(1) }},
                </nobr>
                <nobr v-else>
                  {{ item[0].toUpperCase() + item.slice(1) }}
                </nobr>
              </nobr>
            </p>
            <div
              v-if="
                detail_data.number_of_samples[0] > 0 ||
                  detail_data.number_of_subjects[0] > 0
              "
            >
              <p class="indent --2">
                <b>Number of samples:</b>
                {{ detail_data.number_of_samples[0] }} samples from
                {{ detail_data.number_of_subjects[0] }} subjects
              </p>
            </div>
            <div v-else>
              <p class="indent --2"><b>Number of samples:</b> N/A</p>
            </div>
          </span>

          <!-- about content -->
          <span v-if="$route.query.datasetTab === 'about'" class="tab-content">
            <h2>About this dataset</h2>
            <p><b>Title:</b> {{ title }}</p>
            <p><b>First Published:</b> N/A</p>
            <p><b>Last Published:</b> N/A</p>
            <hr />
            <p><b>Contact Author:</b> N/A</p>
            <hr />
            <p><b>Award(s):</b> N/A</p>
            <hr />
            <p><b>Associated project(s):</b> N/A</p>
            <p><b>Institution(s):</b> N/A</p>
            <hr />
            <h2>About this version</h2>
            <!-- <p><b>Version 3 Revision 1:</b> N/A</p> -->
            <p><b>Dataset DOI:</b> N/A</p>
          </span>

          <!-- cite content -->
          <span v-if="$route.query.datasetTab === 'cite'" class="tab-content">
            <h2>Dataset Citation</h2>
            <p>
              To promote reproducibility and give credit to investigators who
              publish their data, we recommend citing your usage of 12-labours
              datasets. To make it easy, the 12-labours Portal provides the full
              data citation, including the option of different formats, under
              the Cite tab of each dataset page. For more Information, please
              see our Help page.
            </p>
            <div v-if="apaCitation.length > 0">
              <h5 class="small-title">APA</h5>
              <div class="citaiton-block">
                <el-button
                  icon="el-icon-copy-document"
                  id="copy-btn"
                  @click="copyText(apaCitation)"
                  >Copy</el-button
                >
                <div class="citation-content indent">
                  <div
                    v-for="(item, i) in apaCitation"
                    :key="i"
                    v-html="item"
                  ></div>
                </div>
              </div>
            </div>
            <p>
              Click
              <a href="https://citation.crosscite.org/" target="_blank">
                here
              </a>
              to generate citations in more formats.
            </p>
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

      <div class="left-column">
        <el-card shadow="never" class="image-container">
          <div>
            <img
              :src="datasetImage"
              alt="image"
              @error="replaceByDefaultImage"
            />
          </div>
          <!-- <div>
            <el-button class="left-top-btn" @click="changeTab('files', true)">
              <span class="display-ellipsis --1">Get Dataset</span>
            </el-button>
          </div>
          <div>
            <el-button class="left-top-btn secondary" @click="changeTab('cite', true)">
              <span class="display-ellipsis --1">Cite Dataset</span>
            </el-button>
          </div> -->
          <!-- <div class="pdf-bg" v-show="show_segmentation">
            <el-button class="view-btn" icon="el-icon-close" @click="changeShowState('show_segmentation')"></el-button>
          </div> -->
          <!-- <div>
            <el-button @click="changeShowState('show_pdf')">{{ show_pdf ? "Hide PDF" : "Show PDF" }}</el-button>
            <div class="pdf-bg" v-show="show_pdf">
              <el-button class="view-btn" icon="el-icon-close" @click="changeShowState('show_pdf')"></el-button>
              <div class="pdf-viewer">
                <iframe src="/sample.pdf" style="height: 100%; width: 100%;"></iframe>
              </div>
            </div>
          </div> -->
        </el-card>

        <el-card shadow="never" class="related-container">
          <h4 class="clearfix">Search related datasets</h4>
          <hr />
          <section>
            <div class="card-content">
              <span class="card-title">PROJECT:</span><br />N/A
            </div>
            <hr />
            <div class="card-content">
              <span class="card-title">TYPE:</span><br />
              <el-button
                @click="goToDataset"
                class="secondary"
                id="datasetBrowser"
              >
                <span class="display-ellipsis --1">Dataset</span>
              </el-button>
              <hr />
            </div>
            <div class="card-content" v-if="detail_data.study_organ_system.length > 0">
              <span class="card-title">ANATOMICAL STRUCTURE:</span><br />
              <div>
                <div v-for="(organ, i) in detail_data.study_organ_system" :key="i">
                  <el-button @click="goWithFacet(organ)" class="secondary">
                    <span class="display-ellipsis --1">{{ organ }}</span>
                  </el-button>
                </div>
              </div>
              <hr />
            </div>
            <div class="card-content" v-if="species_list.length > 0">
              <span class="card-title">SPECIES:</span><br />
              <div>
                <div v-for="(species, i) in species_list" :key="i">
                  <el-button @click="goWithFacet(species)" class="secondary">
                    <span class="display-ellipsis --1">{{ species }}</span>
                  </el-button>
                </div>
              </div>
              <hr />
            </div>
            <!-- <div class="card-content">
              <span class="card-title">EXPERIMENTAL APPROACH:</span><br />
              <el-button
                @click="goWithFacet('Anatomy')"
                class="secondary"
                :disabled="true"
              >
                <span class="display-ellipsis --1">N/A</span>
              </el-button>
            </div>
            <hr /> -->
            <div class="card-content" v-if="sex_list.length > 0">
              <span class="card-title">SEX:</span><br />
              <div>
                <div v-for="(sex, i) in sex_list" :key="i">
                  <el-button @click="goWithFacet(sex)" class="secondary">
                    <span class="display-ellipsis --1">{{ sex }}</span>
                  </el-button>
                </div>
              </div>
              <hr />
            </div>
            <div class="card-content">
              <span class="card-title">CONTRIBUTORS:</span><br />
              <ul>
                <li v-for="(name, i) in detail_data.contributor_name" :key="i">
                  <span
                    v-if="
                      detail_data.contributor_name.length !==
                        detail_data.contributor_orcid.length
                    "
                  >
                    {{
                      modifyName(name, detail_data.contributor_name.length - 1)
                    }}
                  </span>
                  <a v-else :href="modifyLink(i)">
                    {{
                      modifyName(name, detail_data.contributor_name.length - 1)
                    }}
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import backendQuery from "@/services/backendQuery";
import axios from "axios";
import DatasetFiles from "../../../../components/DataBrowser/DatasetFiles.vue";

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
  components: { DatasetFiles },
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
      apaCitation: [],
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
    let { data, facets } = await backendQuery.fetchQueryData(
      this.$config.query_api_url,
      "experiment_query",
      { submitter_id: [this.$route.params.id] },
      ""
    );
    this.handleFacets(facets);
    
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

    await this.handleCitation();

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
    goToDataset() {
      this.$router.push({
        path: "/data/browser",
        query: {
          type: "dataset",
          page: 1,
          limit: 10,
        },
      });
    },

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

    combineNames() {
      let result = "";
      let name_list = this.detail_data.contributor_name;
      name_list.map((item) => {
        let person_names = item.split(", ");
        result += person_names[1] + " " + person_names[0] + ", ";
      });
      return result.slice(0, -2);
    },

    modifyName(name, i) {
      let name_list = name.split(", ");
      let result;
      if (i === this.detail_data.contributor_name.length - 1) {
        result = name_list[1] + " " + name_list[0];
      } else {
        result = name_list[1] + " " + name_list[0] + ", ";
      }
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

    goWithFacet(facet) {
      let words_list = facet.split(" ");
      let result = "";
      words_list.forEach((word) => {
        result += " " + word[0].toUpperCase() + word.slice(1);
      });
      result = result.slice(1);
      this.$router.push({
        path: "/data/browser",
        query: {
          type: "dataset",
          page: 1,
          limit: 10,
          facets: result,
        },
      });
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

    async handleCitation() {
      for (let item of this.detail_data.identifier) {
        await axios
          .get(item, {
            headers: {
              Accept: "text/x-bibliography; style=apa",
            },
          })
          .then((res) => {
            if (!res.data.includes("<!doctype html>"))
              this.apaCitation.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    copyText(text_list) {
      let text = "";
      text_list.map((item) => {
        text += item;
        if (!item.includes("\n")) {
          text += "\n";
        }
      });
      let inputNode = document.createElement("input");
      inputNode.value = text;
      document.body.appendChild(inputNode);
      inputNode.select();
      document.execCommand("copy");
      inputNode.className = "oInput";
      inputNode.id = "clipboard";
      inputNode.style.display = "none";
      this.$message.success("copied");
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

    replaceByDefaultImage(error) {
      error.target.src = this.imagePlaceholder;
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
      facets.forEach((item) => {
        if (item.term === "Species")
          this.species_list.push(item.facet);
        else if (item.term === "Sex")
          this.sex_list.push(item.facet);
        else if (item.term === "Age category")
          this.age_list.push(item.facet);
      })
    },
  },
};
</script>

<style scoped lang="scss">
.loading-container {
  min-height: 80vh;
}

.container-default {
  @media only screen and (min-width: $viewport-sm) {
    display: flex;

    @media only screen and (min-width: calc($viewport-lg - 20rem)) {
      margin: auto;
      width: 90rem;
    }
  }

  .left-column {
    order: 1;

    @media only screen and (min-width: $viewport-sm) {
      max-width: 20rem;
    }

    min-width: 15rem;

    .image-container {
      text-align: center;

      img {
        width: 13rem;
      }

      .left-top-btn {
        margin: 1rem 0 0 0;
      }
    }

    .related-container {
      margin-top: 2rem;

      .card-title {
        font-size: 1.3rem;
      }

      .card-content {
        margin: 1rem 0.5rem 1rem 0.5rem;

        .secondary {
          margin-top: 0.5rem;
          padding: 0 1.5rem 0 1.5rem;

          span {
            font-size: 1rem;
          }
        }
      }
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

hr {
  border: 0.5px solid #e4e7ed;
  margin: 1rem 0 1rem 0;
}

p {
  font-size: 1rem;
}

h2 {
  margin: 0.5rem 0 0.5rem 0;
  font-size: 1.5rem;
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

li {
  a {
    font-size: 1.13rem;
  }
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
