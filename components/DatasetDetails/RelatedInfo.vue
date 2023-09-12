<template>
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
        <!-- <div class="card-content">
          <span class="card-title">PROJECT:</span><br />N/A
        </div>
        <hr /> -->
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
</template>

<script>
export default {
  name: "RelatedInfo",
  props: [ "detail_data", "datasetImage", "imagePlaceholder", "species_list", "sex_list", "age_list" ],
  // data: () => {
  //   imagePlaceholder: require("../../../../static/img/12-labours-logo-black.png")
  // },

  methods: {
    replaceByDefaultImage(error) {
      error.target.src = this.imagePlaceholder;
    },

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

    modifyLink(i) {
      return this.$parent.modifyLink(i);
    },

    modifyName(name, i) {
      return this.$parent.modifyName(name, i);
    },
  }
}
</script>

<style scoped lang="scss">
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

li {
  a {
    font-size: 1.13rem;
  }
}
</style>