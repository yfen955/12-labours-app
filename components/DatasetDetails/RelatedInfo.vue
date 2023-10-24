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
        <div v-for="facet_list, key, i in facets_dict" :key="i">
          <div class="card-content" v-if="facet_list.length > 0">
            <span class="card-title">{{ key.toUpperCase() }}:</span><br />
            <div>
              <div v-for="(facet, n) in facet_list" :key="n">
                <el-button @click="goWithFacet(facet)" class="secondary">
                  <span class="display-ellipsis --1">{{ facet }}</span>
                </el-button>
              </div>
            </div>
            <hr />
          </div>
        </div>
        
        <div class="card-content">
          <span class="card-title">CONTRIBUTORS:</span><br />
          <ul>
            <li v-for="(name, i) in detail_data.contributors" :key="i">
              <span
                v-if="
                  detail_data.contributors.length !==
                    detail_data.contributor_orcids.length
                "
              >{{ name }}</span>
              <a v-else :href="modifyLink(i)">{{ name }}</a>
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
  props: [ "detail_data", "datasetImage", "imagePlaceholder", "facets_dict" ],

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
      this.$router.push({
        path: "/data/browser",
        query: {
          type: "dataset",
          page: 1,
          limit: 10,
          facets: facet,
          relation: "and"
        },
      });
    },

    modifyLink(i) {
      return this.$parent.modifyLink(i);
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