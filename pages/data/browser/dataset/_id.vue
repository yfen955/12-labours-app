<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />

    <!-- loading -->
    <div
      v-if="isLoading"
      v-loading="isLoading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      class="loading-container"
    ></div>

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
              <el-button><span class="display-ellipsis --1">Get Dataset</span></el-button>
            </div>
            <div class="text item">
              <el-button><span class="display-ellipsis --1">Cite Dataset</span></el-button>
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
                  <el-button @click="goToDataset"><span class="display-ellipsis --1">Dataset</span></el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">ANATOMICAL STRUCTURE:</span>
                <div class="card-content">
                  <el-button><span class="display-ellipsis --1">COLON</span></el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">SPECIES:</span>
                <div class="card-content">
                  <el-button><span class="display-ellipsis --1">MOUSE</span></el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">EXPERIMENTAL APPROACH:</span>
                <div class="card-content">
                  <el-button><span class="display-ellipsis --1">ANATOMY</span></el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">SEX:</span>
                <div class="card-content">
                  <el-button><span class="display-ellipsis --1">MALE</span></el-button>
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
              <hr>
              <el-col>
                <span class="card-title">test filter</span>
                <div class="card-content">
                  <el-button @click="goWithFacet('Scaffold')"><span class="display-ellipsis --1">Scaffold</span></el-button>
                </div>
              </el-col>
            </div>
          </el-card>
        </el-col>

        <!-- right column -->
        <el-col :span="18">
          <!-- title & description -->
          <el-card shadow="never">
            <h1>{{sampleData.title}}</h1>
            <br>
            <el-row :gutter="20">
              <el-col :span="18">
                <div class="text item">
                  <b>Contributors: {{contributorName}}</b>
                </div>
                <hr>
                <div class="text item">
                  <b>Description:</b><!--  {{ sampleData.description }} -->
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

            <!-- abstract content -->
            <span v-if="$route.query.datasetTab === 'abstract'" class="tab-content">
              <p><b>Study Purpose:</b></p>
              <p><b>Completeness:</b></p>
              <p><b>Primary vs derivative data:</b></p>
              <p><b>Important Notes:</b></p>
              <hr>
              <h2>Metadata</h2>
              <p><b>Experimental Design:</b></p>
              <p class="indent"><b>Protocol Links:</b></p>
              <p class="indent"><b>Experimental Approach:</b></p>
              <p><b>Subject Information:</b></p>
              <p class="indent"><b>Anatomical structure:</b></p>
              <p class="indent"><b>Species:</b></p>
              <p class="indent"><b>Sex:</b></p>
              <p class="indent"><b>Age range:</b></p>
              <div v-if="sampleData.number_of_samples>0||sampleData.number_of_subjects>0">
                <p class="indent"><b>Number of samples:</b> {{sampleData.number_of_samples}} samples from {{sampleData.number_of_subjects}} subjects</p>
              </div>
              <div v-else>
                <p class="indent"><b>Number of samples:</b> N/A</p>
              </div>
            </span>
            
            <!-- about content -->
            <span v-if="$route.query.datasetTab === 'about'" class="tab-content">
              <h2>About this dataset</h2>
              <p><b>Title:</b> {{sampleData.title}}</p>
              <p><b>First Published:</b></p>
              <p><b>Last Published:</b></p>
              <hr>
              <p><b>Contact Author:</b></p>
              <hr>
              <p><b>Award(s):</b></p>
              <hr>
              <p><b>Associated project(s):</b></p>
              <p><b>Institution(s):</b></p>
              <hr>
              <h2>About this version</h2>
              <p><b>Version 3 Revision 1:</b></p>
              <p><b>Dataset DOI:</b></p>
            </span>
            
            <!-- cite content -->
            <span v-if="$route.query.datasetTab === 'cite'" class="tab-content">
              <h2>Dataset Citation</h2>
              <p>To promote reproducibility and give credit to investigators who publish their data, we recommend citing your usage of SPARC datasets. To make it easy, the SPARC Portal provides the full data citation, including the option of different formats, under the Cite tab of each dataset page. For more Information, please see our Help page.</p>
            </span>
            
            <!-- files content -->
            <span v-if="$route.query.datasetTab === 'files'" class="tab-content">
              files
            </span>
            
            <!-- gallery content -->
            <span v-if="$route.query.datasetTab === 'gallery'" class="tab-content">
              <el-carousel :autoplay="false" trigger="click" type="card" arrow="always" height="300px" v-if="!isLoading">
                <!-- view Scaffold -->
                <el-carousel-item v-show="has_scaffold" v-for="item in scaffold_manifest_data" :key="item.id">
                  <el-card class="medium">
                    <img :src="imgPlaceholder" alt="image" class="model-image">
                    <p><b>Scaffold</b></p>
                    <el-popover
                      placement="top-start"
                      trigger="hover"
                      :content="generateFilename(item.filename)"
                    >
                      <p slot="reference" class="model-name">{{ generateFilename(item.filename) }}</p>
                    </el-popover>
                    <div>
                      <el-button @click="viewMap('scaffold', item.id)" class="model-button">
                        View Scaffold
                      </el-button>
                    </div>
                  </el-card>
                </el-carousel-item>

                <!-- view Flatmap -->
                <el-carousel-item>
                  <el-card class="medium">
                    <img :src="imgPlaceholder" alt="image" class="model-image">
                    <p><b>Flatmap</b></p>
                    <p>Mouse</p>
                    <div>
                      <el-button @click="viewMap('flatmap', 1)" class="model-button">
                        View Flatmap
                      </el-button>
                    </div>
                  </el-card>
                </el-carousel-item>

                <!-- view Plot -->
                <el-carousel-item v-show="has_plot" v-for="item in plot_manifest_data" :key="item.id">
                  <el-card class="medium">
                    <i class="el-icon-data-analysis"></i>
                    <p><b>Plot</b></p>
                    <el-popover
                      placement="top-start"
                      trigger="hover"
                      :content="generateFilename(item.filename)"
                    >
                      <p slot="reference" class="model-name">{{ generateFilename(item.filename) }}</p>
                    </el-popover>
                    <div>
                      <el-button @click="viewMap('plot', item.id)" class="model-button">
                        View Plot
                      </el-button>
                    </div>
                  </el-card>
                </el-carousel-item>
              </el-carousel>
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import backendQuery from '@/services/backendQuery';

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
  props: [ 'id' ],
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
            query: {
              type: 'dataset',
              page: 1,
              limit: 10,
            }
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
    this.currentTab = this.$route.query.datasetTab;

    this.sampleData = await backendQuery.fetchQueryData('dataset_description', {submitter_id: `${this.$route.params.id}-dataset_description`});
    this.sampleData = this.sampleData[0];

    let scaffold = {
      additional_types: ["application/x.vnd.abi.scaffold.meta+json", "inode/vnd.abi.scaffold+file"]
    };
    this.scaffold_manifest_data = await backendQuery.fetchQueryData('manifest', scaffold, `${this.$route.params.id}`);
    if (this.scaffold_manifest_data.length === 0) {
      this.has_scaffold = false
    } else {
      this.has_scaffold = true
    }

    let plot = {
      additional_types: ["text/vnd.abi.plot+Tab-separated-values", "text/vnd.abi.plot+tab-separated-values", "text/vnd.abi.plot+csv"]
    };
    this.plot_manifest_data = await backendQuery.fetchQueryData('manifest', plot, `${this.$route.params.id}`);
    if (this.plot_manifest_data.length === 0) {
      this.has_plot = false
    } else {
      this.has_plot = true
    }

    this.modifyName();
    this.isLoading = false;
  },

  methods: {
    // go back to the data browser for datasets
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

    // change the tab by change the variable in the url
    changeTab(val) {
      this.$router.push({
        path: `${this.$route.path}`,
        query: { datasetTab: val }
      })
    },

    // go to the map viewer with id
    viewMap(model, uuid) {
      let route = this.$router.resolve({
        name: `data-maps-${model}-id`,
        params: { id: uuid }
      });
      window.open(route.href);
    },

    modifyName() {
      let name_list = this.sampleData.contributor_name;
      name_list.map(item => {
        let person_names = item.split(', ');
        this.contributorName += person_names[1] + ' ' + person_names[0] + ", ";
      })
      this.contributorName = this.contributorName.slice(0, -2);
    },

    generateFilename(name) {
      let name_list = name.split("/");
      let index = name_list.length - 1;
      let fileName = name_list[index];
      return fileName;
    },

    goWithFacet(facet) {
      let id_list = this.$store.getters['getFacetId'];
      let id = id_list.indexOf(facet);
      this.$router.push({
        path:'/data/browser',
        query: {
          type: 'dataset',
          page: 1,
          limit: 10,
          facets: id
        }
      })
    }
  },
}
</script>

<style scoped lang="scss">
.loading-container {
  height: 30em;
}
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
  margin-left: calc((50% - 270px) / 2);
  width: 270px;
}
.medium {
  height: 270px;
  line-height: 1.5em;

  .model-name {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.model-image {
  width: 70%;
}
.model-button {
  margin-top: .5em;
}
h2 {
  margin: 0.5em 0 0.5em;
  font-size: 1.5em;
}
.tab-content {
  line-height: 2.5em;
  hr {
    margin: 0.5em 0 0.5em;
  }
}
.indent {
  text-indent: 2em;
}
</style>