<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
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
            <h1>{{sampleData.title}}</h1>
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
              <h3>files</h3>
              <el-button @click="handlePreview">Preview the file</el-button>
              <el-button @click="handleDownload">Download the file</el-button>
            </span>
            <span v-if="$route.query.datasetTab === 'gallery'">
              <el-row :gutter="20" class="gallery-container">
                <el-col :span="8">
                  <el-card v-show="has_scaffold">
                    <p>scaffold image</p>
                    <div>
                      <el-button @click="viewScaffold">View Scaffold</el-button>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card v-show="has_scaffold">
                    <p>flatmat image</p>
                    <div>
                      <el-button @click="viewFlatmap">View Flatmap</el-button>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
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
      datasetTabs,
      currentTab: '',
      sampleData: [],
      imgPlaceholder: require("../../../../static/img/12-labours-logo-black.png"),
      currentID: '',
      manifest_data: [],
      has_scaffold: false,
      contributorName: "",
    }
  },
  
  created: async function() {
    if (!this.$route.query.datasetTab) {
      this.$router.push({
        path: `${this.$route.path}`,
        query: { datasetTab: 'abstract' }
      })
      this.currentTab = 'abstract';
    } else {
      this.currentTab = this.$route.query.datasetTab;
    }
    
    this.sampleData = await this.fetch_data('dataset_description', {}, `${this.$route.params.id}`);
    this.sampleData = this.sampleData[0];

    let filters = {additional_types: ["application/x.vnd.abi.scaffold.meta+json"]};
    this.manifest_data = await this.fetch_data('manifest', filters, `${this.$route.params.id}`);
    if (this.manifest_data.length === 0) {
      this.has_scaffold = false
    } else {
      this.has_scaffold = true
    }

    this.modifyName();
    
    // let filter_dict = this.$route.params.filter_list;
    // console.log(this.$route.params);
  },

  methods: {
    async fetch_data(nodeName, filter_dict, searchContent) {
      let fetched_data = [];
      let newPayload = {
        node: nodeName,
        filter: filter_dict,
        search: searchContent,
        number: 10,
        page: 1,
      };
      const path = `${process.env.query_api_url}graphql`;
      await axios
        .post(path, newPayload)
        .then((res) => {
          fetched_data = res.data.data;
        })
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
    async viewScaffold() {
      // let filters = {additional_types: ["application/x.vnd.abi.scaffold.meta+json"]};
      // let manifest_data = await this.fetch_data('manifest', filters, this.$route.params.id);
      
      let route = this.$router.resolve({
        path: '/data/maps',
        query: {
          display: 'scaffold',
          url: `${process.env.query_api_url}download/data/datasets/${this.$route.params.id}/${this.manifest_data[0].filename}`,
        }
      });
      window.open(route.href);
    },

    // go to map viewer with display & taxo & uberonid
    viewFlatmap() {
      let route = this.$router.resolve({
        path: '/data/maps',
        query: {
          display: 'flatmap',
          taxo: 'NCBITaxon:10114',
          uberonid: 'UBERON:0013702',
        }
      });
      window.open(route.href);
    },

    handlePreview() {

    },

    // download the file
    handleDownload() {
      const path = `datasets/${this.sampleData.experiments[0].submitter_id}/${this.sampleData.filename}`;
      const filepath = path.replaceAll("/", "&");
      window.open(`${process.env.query_api_url}download/data/${filepath}`, "_self");
    },

    modifyName() {
      let name_list = this.sampleData.contributor_name.slice(2, -2).split("', '");
      for (let i = 0; i < name_list.length; i++) {
        let person_list = name_list[i].split(', ');
        this.contributorName += person_list[1] + ' ' + person_list[0] + ", ";
      }
      this.contributorName = this.contributorName.slice(0, -2);
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
  // margin-bottom: 1em;
}
.inline-block {
  display: flex;
  margin-bottom: 0;
  .right-item {
    margin-left: 62%;
  }
}
</style>