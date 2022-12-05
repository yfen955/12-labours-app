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

    <div class="center">
      <div class="container-default" v-if="!isLoading">

        <div class="right-column">
          <el-card shadow="never" class="description-container">
            <h1>{{sampleData.title}}</h1>
            <div class="information-top">
              <section class="description">
                <p>
                  <b>Contributors: </b>
                  {{contributorName}}
                </p>
                <hr>
                <p>
                  <b>Description: </b>
                  <!-- {{ sampleData.description }} -->
                </p> 
              </section>
              <el-card shadow="never" class="version">
                <p>
                  <b>Viewing version:</b> 1.0
                </p>
                <p>DOI: 10.26275/umgm-rzar</p>
                <p>August 10, 2022</p>
                <p>
                  <i class="el-icon-document-copy"></i> 2532 files
                </p>
                <p>
                  <i class="el-icon-files"></i> 14.88 GB
                </p>
                <p>
                  <b>Latest version:</b> 1.0
                </p>
                <p>August 10, 2022</p>
                <p>View other versions</p>
              </el-card>
            </div>
            <hr>
            <div class="information-bottom">
              <p class="usage">
                <b>Usage Rights:</b> CC-BY-4.0
              </p>
              <p class="download">
                <b>Downloads:</b> 0
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
                  <el-card class="carousel">
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
                  <el-card class="carousel">
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
                  <el-card class="carousel">
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
        </div>

        <div class="left-column">
          <el-card shadow="never" class="image-container">
            <div>
              <img :src="imgPlaceholder" alt="image"/>
            </div>
            <div>
              <el-button class="left-top-btn">
                <span class="display-ellipsis --1">Get Dataset</span>
              </el-button>
            </div>
            <div>
              <el-button class="left-top-btn secondary">
                <span class="display-ellipsis --1">Cite Dataset</span>
              </el-button>
            </div>
          </el-card>
  
          <el-card shadow="never" class="related-container">
            <h4 class="clearfix">Search related datasets</h4>
            <hr>
            <section>
              <div class="card-content">
                <span class="card-title">PROJECT:</span><br/>
                Anatomic-Functional Mapping of Enteric Neural Circuits
              </div>
              <hr>
              <div class="card-content">
                <span class="card-title">TYPE:</span><br/>
                <el-button @click="goToDataset" class="secondary">
                  <span class="display-ellipsis --1">Dataset</span>
                </el-button>
              </div>
              <hr>
              <div class="card-content">
                <span class="card-title">ANATOMICAL STRUCTURE:</span><br/>
                <el-button class="secondary">
                  <span class="display-ellipsis --1">COLON</span>
                </el-button>
              </div>
              <hr>
              <div class="card-content">
                <span class="card-title">SPECIES:</span><br/>
                <el-button class="secondary">
                  <span class="display-ellipsis --1">MOUSE</span>
                </el-button>
              </div>
              <hr>
              <div class="card-content">
                <span class="card-title">EXPERIMENTAL APPROACH:</span><br/>
                <el-button class="secondary">
                  <span class="display-ellipsis --1">ANATOMY</span>
                </el-button>
              </div>
              <hr>
              <div class="card-content">
                <span class="card-title">SEX:</span><br/>
                <el-button class="secondary">
                  <span class="display-ellipsis --1">MALE</span><br/>
                </el-button>
              </div>
              <hr>
              <div class="card-content">
                <span class="card-title">CONTRIBUTORS:</span><br/>
                <ul>
                  <li v-for="i in 4" :key="i">
                    dummy item {{ i }}
                  </li>
                </ul>
              </div>
              <hr>
              <div class="card-content">
                <span class="card-title">test filter:</span><br/>
                <el-button @click="goWithFacet('Scaffold')" class="secondary">
                  <span class="display-ellipsis --1">Scaffold</span>
                </el-button>
              </div>
            </section>
          </el-card>
        </div>
      </div>
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
      pageTitle: 'Dataset',
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'HOME'
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
          label: 'DATA BROWSER'
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
  min-height: 100vh;
}
.container-default {
  @media only screen and (min-width: $viewport-sm) {
    display: flex;
  }
  .left-column {
    order: 1;
    min-width: 15rem;
    .image-container {
      text-align: center;
      img {
        width: 10rem;
        @media only screen and (max-width: $viewport-sm) {
          width: 13rem;
        }
      }
      .left-top-btn {
        margin: 1rem 0 0 0;
      }
    }
    .related-container {
      margin-top: 2rem;
      .card-title {
        font-size: 1.5rem;
      }
      .card-content {
        margin: 1rem 0.5rem 1rem 0.5rem;
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
        .version {
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
  .indent {
    text-indent: 2rem;
  }
}
</style>