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
                  <b>Contributors: {{sampleData.contributor_name}}</b>
                </div>
                <hr>
                <div class="text item">
                  <!-- <b>Description:</b> {{ sampleData.description }} -->
                  <b>Description:</b> Each set includes membrane potential records from a myenteric neuron of mouse proximal colon plus micrographs of cell body morphology, immunoreactivity for nNOS, calretinin (where possible), and micrographs showing axonal projections
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
              :activeTab="defaultTab"
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
                  <el-card>
                    <p>scaffold image</p>
                    <div>
                      <el-button @click="viewScaffold">View Scaffold</el-button>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
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
      defaultTab: "abstract",
      sampleData: [],
      imgPlaceholder: require("../../../../static/img/12-labours-logo-black.png"),
      currentID: '',
    }
  },
  
  created: async function() {
    this.$router.push({
      path: `${this.$route.path}`,
      query: { datasetTab: 'abstract' }
    })

    // // let payload = {
    // //   program: this.$route.params.program,
    // //   project: this.$route.params.project,
    // //   format: this.$route.params.format,
    // // }
    let newPayload = {
      node: 'dataset_description',
      filter: { study_organ_system: ["heart", "brain"]},
      search: `${this.$route.params.id}`,
    };
    const path = `${process.env.query_api_url}graphql`;
    await axios
      .post(path, newPayload)
      .then((res) => {
        this.sampleData = res.data.data["dataset_description"][0];
        console.log(this.sampleData);
      })
  },

  methods: {
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
        path: '/data/browser/dataset',
        query: { datasetTab: val }
      })
    },

    // go to map viewer with display & url
    viewScaffold() {
      let route = this.$router.resolve({
        path: '/data/maps',
        query: {
          display: 'scaffold',
          url: `https://mapcore-bucket1.s3-us-west-2.amazonaws.com/bladder/rat/rat_bladder_metadata.json`,
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