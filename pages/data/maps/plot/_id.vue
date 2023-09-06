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

  async fetch() {
    this.isLoading = true;
    let data = await backendQuery.getSingleData(this.$config.query_api_url, this.$route.params.id);
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
.model-container .plot-container {
  height: 80vh;
}
</style>