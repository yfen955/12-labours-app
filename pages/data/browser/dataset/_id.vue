<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default" v-if="!isLoading">
      <el-row :gutter="20">

        <!-- left column -->
        <el-col :span="6">
          <!-- image -->
          <el-card shadow="never" class="img-container">
            <div class="text item">
              <img :src="imgPlaceholder" alt="image" style="width: 90%">
            </div>
            <div class="text item">
              <el-button>Get Dataset</el-button>
            </div>
            <div class="text item">
              <el-button>Cite Dataset</el-button>
            </div>
          </el-card>
          <br>

          <!-- related information -->
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <b>Search related datasets</b>
            </div>
            <div class="text item">
              <el-col>
                <span class="card-title">PROJECT:</span>
                <div class="card-content">
                  Anatomic-Functional Mapping of Enteric Neural Circuits
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">TYPE:</span>
                <div class="card-content">
                  <el-button @click="goToDataset">Dataset</el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">ANATOMICAL STRUCTURE:</span>
                <div class="card-content">
                  <el-button>COLON</el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">SPECIES:</span>
                <div class="card-content">
                  <el-button>MOUSE</el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">EXPERIMENTAL APPROACH:</span>
                <div class="card-content">
                  <el-button>ANATOMY</el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">SEX:</span>
                <div class="card-content">
                  <el-button>MALE</el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">CONTRIBUTORS:</span>
                <div class="card-content">
                  <ul>
                    <li v-for="i in 4" :key="i">
                      dummy item {{ i }}
                    </li>
                  </ul>
                </div>
              </el-col>
            </div>
          </el-card>
        </el-col>

        <!-- right column -->
        <el-col :span="18">
          <!-- title & description -->
          <el-card shadow="never">
            <h1>{{sampleData.dataset_descriptions[0].title}}</h1>
            <br>
            <el-row :gutter="20">
              <el-col :span="18">
                <div class="text item">
                  <b>Contributors: {{contributorName}}</b>
                </div>
                <hr>
                <div class="text item">
                  <!-- <b>Description:</b> {{ sampleData.description }} -->
                  <b>Description:</b> 
                </div>
              </el-col>
              <el-col :span="6">
                <el-card shadow="never">
                  <div class="text item small">
                    <b>Viewing version:</b> 1.0
                  </div>
                  <div class="text item small">
                    DOI: 10.26275/umgm-rzar
                  </div>
                  <div class="text item small">
                    August 10, 2022
                  </div>
                  <div class="text item small">
                    <i class="el-icon-document-copy"></i> 2532 files
                  </div>
                  <div class="text item small">
                    <i class="el-icon-files"></i> 14.88 GB
                  </div>
                  <div class="text item small">
                    <b>Latest version:</b> 1.0
                  </div>
                  <div class="text item small">
                    August 10, 2022
                  </div>
                  <div class="text item small">
                    View other versions
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <br>
            <hr>
            <div class="inline-block">
              <div class="text item">
                <b>Usage Rights:</b> CC-BY-4.0
              </div>
              <div class="text item right-item">
                <b>Downloads:</b> 0
              </div>
            </div>
          </el-card>
          <br>

          <!-- details -->
          <el-card shadow="never">
            <tab-nav class="categories-nav"
              :tabs="datasetTabs"
              :activeTab="currentTab"
              v-on:tabClick="changeTab"
            />
            <span v-if="$route.query.datasetTab === 'abstract'">
              abstract
            </span>
            <span v-if="$route.query.datasetTab === 'about'">
              about
            </span>
            <span v-if="$route.query.datasetTab === 'cite'">
              cite
            </span>
            <span v-if="$route.query.datasetTab === 'files'">
              files
              <!-- <el-button @click="handlePreview">Preview the file</el-button>
              <el-button @click="handleDownload">Download the file</el-button> -->
            </span>
            <span v-if="$route.query.datasetTab === 'gallery'">
              <el-carousel :autoplay="false" trigger="click" type="card" arrow="always" height="300px">
                <!-- view Scaffold -->
                <el-carousel-item v-show="has_scaffold" v-for="item in scaffold_manifest_data" :key="item.id">
                  <el-card class="medium">
                    <img :src="imgPlaceholder" alt="image" class="modal-image">
                    <p>Scaffold</p>
                    <p>{{ generateFilename(item.filename) }}</p>
                    <div>
                      <el-button @click="viewScaffold(item)" class="modal-button">View Scaffold</el-button>
                    </div>
                  </el-card>
                </el-carousel-item>

                <!-- view Flatmap -->
                <el-carousel-item>
                  <el-card class="medium">
                    <img :src="imgPlaceholder" alt="image" style="width: 70%">
                    <p>Flatmap</p>
                    <p></p>
                    <div>
                      <el-button @click="viewFlatmap()" class="modal-button">View Flatmap</el-button>
                    </div>
                  </el-card>
                </el-carousel-item>

                <!-- view Plot -->
                <el-carousel-item v-show="has_plot" v-for="item in plot_manifest_data" :key="item.id">
                  <el-card class="medium">
                    <i class="el-icon-data-analysis"></i>
                    <p>Plot</p>
                    <p>{{ generateFilename(item.filename) }}</p>
                    <div>
                      <el-button @click="viewPlot(item)" class="modal-button">View Plot</el-button>
                    </div>
                  </el-card>
                </el-carousel-item>
              </el-carousel>
            </span>
            <span v-if="$route.query.datasetTab === 'references'">
              references
            </span>
            <span v-if="$route.query.datasetTab === 'versions'">
              versions
            </span>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
  {
    label: 'References',
    name: 'references',
  },
  {
    label: 'Versions',
    name: 'versions',
  }
]

export default {
  name: "DataDetails",
  props: [ 'id', 'program', 'project', 'format' ],
  data: () => {
    return {
      pageTitle: `Dataset`,
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'Home'
        },
        {
          to: { name: 'data' },
          label: 'DATA & MODELS'
        },
        {
          to: {
            name: 'data-browser',
            query: { type: 'dataset' }
          },
          label: 'Data Browser'
        },
      ],
      isLoading: false,
      datasetTabs,
      currentTab: '',
      sampleData: [],
      imgPlaceholder: require("../../../../static/img/12-labours-logo-black.png"),
      currentID: '',
      scaffold_manifest_data: [],
      plot_manifest_data: [],
      has_scaffold: false,
      has_plot: false,
      contributorName: "",
    }
  },
  
  created: async function() {
    this.isLoading = true;
    if (!this.$route.query.datasetTab) {
      this.$router.push({
        path: `${this.$route.path}`,
        query: { datasetTab: 'abstract' }
      })
      this.currentTab = 'abstract';
    } else {
      this.currentTab = this.$route.query.datasetTab;
    }
    
    this.sampleData = await this.fetch_data('experiment', {submitter_id: [this.$route.params.id]}, "");
    this.sampleData = this.sampleData[0];
    this.isLoading = false;

    let scaffold = {additional_types: ["application/x.vnd.abi.scaffold.meta+json", "inode/vnd.abi.scaffold+file"]};
    this.scaffold_manifest_data = await this.fetch_data('manifest', scaffold, `${this.$route.params.id}`);
    if (this.scaffold_manifest_data.length === 0) {
      this.has_scaffold = false
    } else {
      this.has_scaffold = true
    }

    let plot = {additional_types: ["text/vnd.abi.plot+Tab-separated-values", "text/vnd.abi.plot+tab-separated-values", "text/vnd.abi.plot+csv"]};
    this.plot_manifest_data = await this.fetch_data('manifest', plot, `${this.$route.params.id}`);
    console.log(this.plot_manifest_data);
    if (this.plot_manifest_data.length === 0) {
      this.has_plot = false
    } else {
      this.has_plot = true
    }

    this.modifyName();
  },

  methods: {
    async fetch_data(nodeName, filter_dict, searchContent) {
      let fetched_data = [];
      let newPayload = {
        node: nodeName,
        filter: filter_dict,
        search: searchContent,
        limit: 100,
        page: 1,
      };
      console.log(newPayload);
      const path = `${process.env.query_api_url}graphql`;
      await axios
        .post(path, newPayload)
        .then((res) => {
          fetched_data = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          fetched_data = [];
        });
      return fetched_data;
    },

    // go back to the data browser for datasets
    goToDataset() {
      this.$router.push({
        path:'/data/browser',
        query: { type: 'dataset' }
      })
    },

    // change the tab by change the variable in the url
    changeTab(val) {
      this.$router.push({
        path: `${this.$route.path}`,
        query: { datasetTab: val }
      })
    },

    // go to map viewer with display & url
    async viewScaffold(item) {
      let route = this.$router.resolve({
        name: 'data-maps-scaffold-id',
        params: {
          id: item.id,
        }
      });
      window.open(route.href);
    },

    // go to map viewer with display & taxo & uberonid
    viewFlatmap() {
      let route = this.$router.resolve({
        name: 'data-maps-flatmap-id',
        params: {
          // id: item.id,
          id: 1,
        }
      });
      window.open(route.href);
    },

    viewPlot(item) {
      let route = this.$router.resolve({
        name: 'data-maps-plot-id',
        params: {
          id: item.id,
        }
      });
      window.open(route.href);
    },

    // handlePreview() {

    // },

    // // download the file
    // handleDownload() {
    //   const path = `datasets/${this.sampleData.experiments[0].submitter_id}/${this.sampleData.filename}`;
    //   const filepath = path.replaceAll("/", "&");
    //   window.open(`${process.env.query_api_url}download/data/${filepath}`, "_self");
    // },

    modifyName() {
      let name_list = this.sampleData.dataset_descriptions[0].contributor_name.slice(2, -2).split("', '");
      for (let i = 0; i < name_list.length; i++) {
        let person_list = name_list[i].split(', ');
        this.contributorName += person_list[1] + ' ' + person_list[0] + ", ";
      }
      this.contributorName = this.contributorName.slice(0, -2);
    },

    generateFilename(name) {
      let name_list = name.split("/");
      let index = name_list.length - 1;
      return name_list[index];
    }
  },
}
</script>

<style scoped lang="scss">
.img-container {
  text-align: center;
}
.text {
  font-size: 1em;
}
.item {
  margin-bottom: 18px;
}
.small {
  font-size: .8em;
  margin: 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.card-title {
  font-size: 1.3em;
}
.card-content {
  margin-top: .5em;
  margin-bottom: .5em;
}
.gallery-container {
  margin-top: 1em;
  text-align: center;
}
hr {
  border: .5px solid #E4E7ED;
}
.inline-block {
  display: flex;
  margin-bottom: 0;
  .right-item {
    margin-left: 62%;
  }
}
.el-icon-data-analysis {
  font-size: 5em;
}
.el-carousel__item {
  margin-top: 1em;
  width: 270px;
}
.medium {
  height: 280px;
}
.modal-image {
  width: 70%;
}
.modal-button {
  margin-top: 1em;
}
</style>