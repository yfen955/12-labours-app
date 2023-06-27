<template>
  <div class="page-outer">
    <div class="container-default">
      <div class="model-container">
        <div class="model-title">
          <h1>Plot Viewer</h1>
          <CopyLink />
        </div>

        <client-only placeholder="Loading Plot ...">
          <div class="plot-container">
            <plot-vuer :data-source="{ url: source_url }" :metadata="metadata" :supplemental-data="supplemental_data" />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import CopyLink from "../../../../components/Map/copyLink";
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';
import backendQuery from "@/services/backendQuery";

export default {
  name: 'PlotViewer',
  components: {
    PlotVuer: process.client
      ? () => import('@abi-software/plotvuer').then(m => m.PlotVuer)
      : null,
    CopyLink
  },
  props: ["id"],
  data: () => {
    return {
      isLoading: true,
      source_url: '',
      metadata: {},
      supplemental_data: [],
    }
  },

  async asyncData({ $configGetter }) {
    $configGetter()
  },

  async fetch() {
    this.isLoading = true;
    let accessScope = await backendQuery.fetchAccessScope(this.$config.query_api_url, this.$auth.$state.loggedIn ? this.$auth.$state.user.email : "public");
    let data = await backendQuery.getSingleData(this.$config.query_api_url, this.$route.params.id, accessScope[0]);
    let filename = data.filename;
    let dataset_id = data.experiments[0].submitter_id;
    this.source_url = `${this.$config.query_api_url}/data/download/${dataset_id}/${filename}`;
    this.metadata = JSON.parse(data.supplemental_json_metadata.replace(/'/g, '"'));
    let supplementPath = data.is_described_by;
    this.supplemental_data = [{ url: `${this.$config.query_api_url}/data/download/${supplementPath}` },];
    this.isLoading = false;
  },

  mounted() {
    this.$fetch()
  }
}
</script>

<style scoped lang="scss">
// .model-container {
//   border: 1px solid #E4E7ED;
//   min-width: 15rem;
// }
// .model-title {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   @media only screen and (max-width: $viewport-sm) {
//     flex-direction: column;
//   }
//   margin: 1rem 2rem 1rem 2rem;
// }
.plot-container {
  height: 70vh;
}
</style>