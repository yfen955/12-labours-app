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
                <span v-if="detail_data.contributor_name.length!==detail_data.contributor_orcid.length" >
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
              <hr>
              <p>
                <b>Description: </b>
                {{ detail_data.subtitle[0] }}
              </p> 
            </section>
            <el-card shadow="never">
              <p>
                <b>Viewing version:</b> {{ detail_data.metadata_version[0] }}
              </p>
              <div v-if="detail_data.identifier.length > 0">
                <b>DOI: </b>
                <div v-for="(item, i) in detail_data.identifier" :key="i" class="indent display-ellipsis --1">
                  <a :href="item" target="_blank">{{ item }}</a>
                </div>
              </div>
              <!-- need more data to display these infomation -->
              <p v-if="detail_data.date">Date: {{ detail_data.date }}</p>
              <p v-if="detail_data.files">
                <i class="el-icon-document-copy"></i> {{ detail_data.files }} files
              </p>
              <p v-if="detail_data.size">
                <i class="el-icon-files"></i> {{ detail_data.size }} GB
              </p>
              <p>
                <b>Latest version:</b> {{ detail_data.metadata_version[0] }}
              </p>
              <p v-if="detail_data.date">Date: {{ detail_data.date }}</p>
              <p v-if="detail_data.other_version">View other version</p>
            </el-card>
          </div>
          <hr v-if="detail_data.download_num">
          <div class="information-bottom" v-if="detail_data.download_num">
            <p class="usage">
              <b>Usage Rights:</b> N/A
            </p>
            <p class="download">
              <b>Downloads:</b> N/A
            </p>
          </div>
        </el-card>

        <el-card shadow="never" class="detail-container">
          <tab-nav class="categories-nav"
            :tabs="datasetTabs"
            :activeTab="currentTab"
            v-on:tabClick="changeTab"
          />

          <!-- abstract content -->
          <span v-if="$route.query.datasetTab === 'abstract'" class="tab-content">
            <p><b>Study Purpose:</b> N/A</p>
            <p><b>Completeness:</b> N/A</p>
            <p><b>Primary vs derivative data:</b> N/A</p>
            <p><b>Important Notes:</b> N/A</p>
            <hr>
            <h2>Metadata</h2>
            <p><b>Experimental Design:</b> N/A</p>
            <p class="indent --2"><b>Protocol Links:</b> N/A</p>
            <p class="indent --2"><b>Experimental Approach:</b> N/A</p>
            <p><b>Subject Information:</b> N/A</p>
            <p class="indent --2">
              <b>Anatomical structure:</b>
              <nobr
                v-for="(organ, i) in detail_data.study_organ_system"
                :key="i"
              >
                <nobr v-if="i < detail_data.study_organ_system.length - 1">{{ organ[0].toUpperCase() + organ.slice(1) }}, </nobr>
                <nobr v-else>{{ organ[0].toUpperCase() + organ.slice(1) }}</nobr>
              </nobr>
            </p>
            <p class="indent --2"><b>Species:</b> N/A</p>
            <p class="indent --2"><b>Sex:</b> N/A</p>
            <p class="indent --2"><b>Age range:</b> N/A</p>
            <div v-if="detail_data.number_of_samples[0] > 0 || detail_data.number_of_subjects[0] > 0">
              <p class="indent --2"><b>Number of samples:</b> {{detail_data.number_of_samples[0]}} samples from {{detail_data.number_of_subjects[0]}} subjects</p>
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
            <hr>
            <p><b>Contact Author:</b> N/A</p>
            <hr>
            <p><b>Award(s):</b> N/A</p>
            <hr>
            <p><b>Associated project(s):</b> N/A</p>
            <p><b>Institution(s):</b> N/A</p>
            <hr>
            <h2>About this version</h2>
            <p><b>Version 3 Revision 1:</b> N/A</p>
            <p><b>Dataset DOI:</b> N/A</p>
          </span>
          
          <!-- cite content -->
          <span v-if="$route.query.datasetTab === 'cite'" class="tab-content">
            <h2>Dataset Citation</h2>
            <p>To promote reproducibility and give credit to investigators who publish their data, we recommend citing your usage of 12-labours datasets. To make it easy, the 12-labours Portal provides the full data citation, including the option of different formats, under the Cite tab of each dataset page. For more Information, please see our Help page.</p>
            <div v-if="detail_data.identifier.length > 0">
              <h5 class="small-title">APA</h5>
              <div class="citaiton-block">
                <el-button icon="el-icon-copy-document" id="copy-btn" @click="copyText(apaCitation)">Copy</el-button>
                <div class="citation-content indent">
                  <div v-for="(item, i) in apaCitation" :key="i" v-html="item"></div>
                </div>
              </div>
            </div>
            <p>Click 
              <a
                href="https://citation.crosscite.org/"
                target="_blank"
              >
              here
              </a>
            to generate citations in more formats.</p>
          </span>
          
          <!-- files content -->
          <span v-if="$route.query.datasetTab === 'files'" class="tab-content">
            <h2>Dataset Files</h2>
            <DatasetFiles />
          </span>
          
          <!-- gallery content -->
          <span v-if="$route.query.datasetTab === 'gallery'" class="tab-content">
            <carousel-card :cards="models_list" v-if="!isLoading" />
          </span>
          
          <!-- references content -->
          <span v-if="$route.query.datasetTab === 'references'" class="tab-content">
            references
          </span>
          
          <!-- versions content -->
          <span v-if="$route.query.datasetTab === 'versions'" class="tab-content">
            versions
          </span>
        </el-card>
      </div>

      <div class="left-column">
        <el-card shadow="never" class="image-container">
          <div v-if="dataset_img">
            <img :src="dataset_img" alt="image" />
          </div>
          <img v-else :src="imgPlaceholder" alt="image" />
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
          <!-- <div>
            <el-button @click="changeShowState('show_segmentation')">{{ show_segmentation ? "Hide Segmentation" : "View Segmentation" }}</el-button>
            <div class="pdf-bg" v-show="show_segmentation">
              <el-button class="view-btn" icon="el-icon-close" @click="changeShowState('show_segmentation')"></el-button>
              <iframe src="https://linkungao.github.io/NRRD_Segmentation_Tool/#/" style="height: 800px; width: 90%;"></iframe>
            </div>
          </div>
          <br>
          <div>
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
          <hr>
          <section>
            <div class="card-content">
              <span class="card-title">PROJECT:</span><br/>N/A
            </div>
            <hr>
            <div class="card-content">
              <span class="card-title">TYPE:</span><br/>
              <el-button @click="goToDataset" class="secondary" id="datasetBrowser">
                <span class="display-ellipsis --1">Dataset</span>
              </el-button>
            </div>
            <hr>
            <div class="card-content">
              <span class="card-title">ANATOMICAL STRUCTURE:</span><br/>
              <div
                v-for="(organ, i) in detail_data.study_organ_system"
                :key="i"
              >
                <el-button
                  @click="goWithFacet(organ)"
                  class="secondary"
                >
                  <span class="display-ellipsis --1">{{ organ }}</span>
                </el-button>
              </div>
            </div>
            <hr>
            <div class="card-content">
              <span class="card-title">SPECIES:</span><br/>
              <el-button @click="goWithFacet('Mouse')" class="secondary" :disabled="true">
                <span class="display-ellipsis --1">N/A</span>
              </el-button>
            </div>
            <hr>
            <div class="card-content">
              <span class="card-title">EXPERIMENTAL APPROACH:</span><br/>
              <el-button @click="goWithFacet('Anatomy')" class="secondary" :disabled="true">
                <span class="display-ellipsis --1">N/A</span>
              </el-button>
            </div>
            <hr>
            <div class="card-content">
              <span class="card-title">SEX:</span><br/>
              <el-button @click="goWithFacet('Male')" class="secondary" :disabled="true">
                <span class="display-ellipsis --1">N/A</span>
              </el-button>
            </div>
            <hr>
            <div class="card-content">
              <span class="card-title">CONTRIBUTORS:</span><br/>
              <ul>
                <li v-for="(name, i) in detail_data.contributor_name" :key="i">
                  <span v-if="detail_data.contributor_name.length!==detail_data.contributor_orcid.length">
                    {{modifyName(name, detail_data.contributor_name.length - 1)}}
                  </span>
                  <a
                    v-else
                    :href="modifyLink(i)"
                  >
                    {{modifyName(name, detail_data.contributor_name.length - 1)}}
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
import backendQuery from '@/services/backendQuery';
import axios from "axios";
import DatasetFiles from '../../../../components/DataBrowser/DatasetFiles.vue';

const datasetTabs = [
  {
    label: 'Abstract',
    name: 'abstract',
  },
  {
    label: 'About',
    name: 'about',
  },
  {
    label: 'Cite',
    name: 'cite',
  },
  {
    label: 'Files',
    name: 'files',
  },
  {
    label: 'Gallery',
    name: 'gallery',
  },
  // {
  //   label: 'References',
  //   name: 'references',
  // },
  // {
  //   label: 'Versions',
  //   name: 'versions',
  // }
]

export default {
  name: "DataDetails",
  props: [ 'id' ],
  components: { DatasetFiles },
  data: () => {
    return {
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'Home'
        },
        {
          to: { name: 'data' },
          label: 'Data & Models'
        },
        {
          to: {
            name: 'data-browser',
            query: {
              type: 'dataset',
              page: 1,
              limit: 10,
            }
          },
          label: 'Data Browser'
        },
      ],
      isLoading: true,
      datasetTabs,
      imgPlaceholder: require("../../../../static/img/12-labours-logo-black.png"),
      detail_data: {},
      title: '',
      scaffold_thumbnail_data: [],
      plot_manifest_data: [],
      thumbnail_data: [],
      apaCitation: [],
      models_list: [],
      dataset_img: '',
      show_segmentation: false,
      show_pdf: false,
    }
  },
  
  created: async function() {
    const data_path = `${this.$config.query_api_url}/graphql/query`;
    let data = await backendQuery.fetchQueryData(data_path, "experiment_query", {submitter_id: [`${this.$route.params.id}`],});
    this.detail_data = data[0].dataset_descriptions[0];
    this.title = data[0].dataset_descriptions[0].title[0];
    this.scaffold_thumbnail_data = data[0].scaffoldViews;
    this.plot_manifest_data = data[0].plots;
    this.thumbnail_data = data[0].thumbnails;

    this.getDatasetImg();
    this.handleModels(this.scaffold_thumbnail_data, this.plot_manifest_data, this.thumbnail_data);

    await this.handleCitation();

    this.show_segmentation = false;
    this.show_pdf = false;

    this.isLoading = false;
  },

  mounted() {
    this.show_segmentation = false;
    this.show_pdf = false;
    this.updateScroll();
  },

  computed: {
    currentTab: function() {
      return this.$route.query.datasetTab;
    },
  },

  watch: {
    'show_pdf': {
      handler() {
        this.updateScroll();
      }
    },
  },

  methods: {
    goToDataset() {
      this.$router.push({
        path:'/data/browser',
        query: {
          type: 'dataset',
          page: 1,
          limit: 10,
        }
      })
    },

    changeTab(val, jump = false) {
      this.$router.push({
        path: this.$route.path,
        query: {
          datasetTab: val,
          path: this.$route.query.path
        }
      });
      if (jump)
        this.$el.querySelector('.detail-container').scrollIntoView({ behavior: "smooth" });
    },

    combineNames() {
      let result = '';
      let name_list = this.detail_data.contributor_name;
      name_list.map(item => {
        let person_names = item.split(', ');
        result += person_names[1] + ' ' + person_names[0] + ", ";
      })
      return result.slice(0, -2);
    },

    modifyName(name, i) {
      let name_list = name.split(', ');
      let result
      if (i === this.detail_data.contributor_name.length - 1)
        result = name_list[1] + ' ' + name_list[0];
      else
        result = name_list[1] + ' ' + name_list[0] + ', ';
      return result;
    },

    modifyLink(i) {
      let link = this.detail_data.contributor_orcid[i];
      if (!link.includes('http'))
        link = 'https://orcid.org/' + link;
      return link;
    },

    generateFilename(name) {
      let name_list = name.split("/");
      let index = name_list.length - 1;
      let fileName = name_list[index];
      return fileName;
    },

    goWithFacet(facet) {
      let words_list = facet.split(' ');
      let result = '';
      words_list.forEach(word => {
        result += ' ' + word[0].toUpperCase() + word.slice(1);
      })
      result = result.slice(1);
      this.$router.push({
        path:'/data/browser',
        query: {
          type: 'dataset',
          page: 1,
          limit: 10,
          facets: result
        }
      })
    },

    generateImg(method, filename, is_source_of) {
      let url = `${this.$config.query_api_url}/data/${method}`;
      if (!filename.includes(this.$route.params.id)) {
        url += `/${this.$route.params.id}`;
      }
      if (is_source_of)
        url += `/${filename.substring(0,filename.lastIndexOf("/"))}/${is_source_of}`;
      else
        url += `/${filename}`;
      return url;
    },

    downloadImg(filename) {
      let url = this.generateImg('download', filename);
      window.open(url);
    },

    async handleCitation() {
      for (let item of this.detail_data.identifier) {
        await axios
          .get(item, {
            headers: {
              "Accept": "text/x-bibliography; style=apa"
            }      
          })
          .then((res) => {
            this.apaCitation.push(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    
    copyText(text_list) {
      let text = "";
      text_list.map(item => {
        text += item;
        if (!item.includes("\n")) {
          text += "\n";
        }
      })
      let inputNode = document.createElement('input');
      inputNode.value = text;
      document.body.appendChild(inputNode);
      inputNode.select();
      document.execCommand('copy');
      inputNode.className = 'oInput';
      inputNode.id = 'clipboard';
      inputNode.style.display = 'none';
      this.$message.success('copied');
    },

    handleModels(scaffold, plot, thumbnail) {
      scaffold.forEach((item) => {
        let model = {
          type: "Scaffold",
          imageUrl: this.generateImg('preview', item.filename, item.is_source_of),
          filename: this.generateFilename(item.filename),
          id: item.id,
          imageDownload: ""
        };
        this.models_list.push(model);
      })
      let flatmap = {
        type: "Flatmap",
        imageUrl: this.imgPlaceholder,
        filename: "",
        id: 1,
        imageDownload: ""
      }
      this.models_list.push(flatmap);
      plot.forEach((item) => {
        let model = {
          type: "Plot",
          imageUrl: "",
          filename: this.generateFilename(item.filename),
          id: item.id,
          imageDownload: ""
        };
        this.models_list.push(model);
      })
      thumbnail.forEach((item) => {
        let model = {
          type: "Thumbnail",
          imageUrl: this.generateImg('preview', item.filename, item.is_source_of),
          filename: this.generateFilename(item.filename),
          id: item.id,
          imageDownload: this.generateImg('download', item.filename)
        };
        this.models_list.push(model);
      })
    },

    getDatasetImg() {
      let item = {};
      if (this.scaffold_thumbnail_data.length > 0) {
        item = this.scaffold_thumbnail_data[0];
      } else if (this.thumbnail_data.length > 0) {
        item = this.thumbnail_data[0];
      }
      if (!item) {
        this.dataset_img = this.imgPlaceholder;
      } else {
        this.dataset_img = this.generateImg('preview', item.filename, item.is_source_of);
      }
    },

    changeShowState(val) {
      if (val === "show_segmentation")
        this.show_segmentation = !this.show_segmentation;
      else if (val === "show_pdf")
        this.show_pdf = !this.show_pdf;
    },

    updateScroll() {
      let mo = function (e) {
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
  },
}
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
    .detail-container{
      margin-top: 2rem;
      @media only screen and (max-width: $viewport-sm) {
        margin-bottom: 2rem;
      }
    }
  }
}
hr {
  border: 0.5px solid #E4E7ED;
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
.el-icon-data-analysis {
  font-size: 5rem;
}
.el-carousel__item {
  margin-top: 1rem;
  margin-left: calc((50% - 17rem) / 2);
  width: 17rem;
}
.carousel {
  height: 17.5rem;
  line-height: 1.5rem;
  .model-name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .model-image {
    width: 10rem;
  }
  .model-button {
    margin-top: 1rem;
  }
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