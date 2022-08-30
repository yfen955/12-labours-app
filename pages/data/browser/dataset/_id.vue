<template>
  <div>
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <el-row :gutter="20">

        <!-- left column -->
        <el-col :span="6">
          <!-- image -->
          <el-card shadow="never">
            <div class="text item">
              image
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
                  dummy data
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
                  <el-button></el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">SPECIES:</span>
                <div class="card-content">
                  <el-button></el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">EXPERIMENTAL APPROACH:</span>
                <div class="card-content">
                  <el-button></el-button>
                </div>
              </el-col>
              <hr>
              <el-col>
                <span class="card-title">SEX:</span>
                <div class="card-content">
                  <el-button></el-button>
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
            <h1>Title</h1>
            <br>
            <el-row :gutter="20">
              <el-col :span="18">
                <div class="text item">
                  <b>Contributors: </b>
                </div>
                <hr>
                <div class="text item">
                  <b>Description: </b>
                </div>
              </el-col>
              <el-col :span="6">
                <el-card shadow="never">
                  <div class="text item small">
                    <b>Viewing version: </b>
                  </div>
                  <div class="text item small">
                    DOI:
                  </div>
                  <div class="text item small">
                    date
                  </div>
                  <div class="text item small">
                    <i class="el-icon-document-copy"></i> files
                  </div>
                  <div class="text item small">
                    <i class="el-icon-files"></i> size
                  </div>
                  <div class="text item small">
                    <b>Latest version: </b>
                  </div>
                  <div class="text item small">
                    date
                  </div>
                  <div class="text item small">
                    View other versions
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <hr>
            <div class="text item">
              <b>Usage Rights: </b>
            </div>
          </el-card>

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
              <h3>gallery</h3>
              <el-button @click="viewModel">View the model</el-button>
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
  data: () => {
    return {
      pageTitle: 'Dataset',
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
    }
  },
  
  created: async function() {
    this.$router.push({
      path:'/data/browser/dataset',
      query: { datasetTab: 'abstract' }
    })

    let id = "193e278e-5895-4d1b-be79-55697416cb58";
    // let payload = {
    //   program: this.$route.params.program,
    //   project: this.$route.params.project,
    //   format: this.$route.params.format,
    // }
    let payload = {
      program: "demo1",
      project: "12L",
      format: "json",
    };
    const path = `${process.env.query_api_url}record/${id}`;
    await axios
      .post(path, payload)
      .then((res) => {
        this.sampleData = res.data[0];
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

    viewModel() {
      console.log();
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

<style lang="scss">
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
hr {
  border: .5px solid #E4E7ED;
  // margin-bottom: 1em;
}
</style>