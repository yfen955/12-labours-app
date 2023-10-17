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
            <plot-vuer
              v-if="!isLoading"
              :data-source="{ url: source_url }"
              :metadata="metadata"
              :supplemental-data="supplemental_data"
            />
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
  name: "PlotViewer",
  components: {
    PlotVuer: process.client
      ? () => import("@abi-software/plotvuer").then((m) => m.PlotVuer)
      : null,
    CopyLink,
  },
  props: ["id"],
  data: () => {
    return {
      isLoading: true,
      source_url: "",
      metadata: {},
      supplemental_data: [],
    };
  },
  created() {
    this.handlePlot();
  },
  methods: {
    handlePlot: async function() {
      this.isLoading = true;
      const data = await backendQuery.fetchRecordData(
        this.$config.query_api_url,
        this.$route.params.id,
        this.$config.query_access_token
      );
      const filename = data.filename;
      const dataset_id = data.experiments[0].submitter_id;
      const endpoint = `${this.$config.query_api_url}/data/download`;
      const oneOffToken = backendQuery.getLocalStorage("one_off_token");
      this.source_url =
        endpoint + `/${dataset_id}/${filename}` + `?token=${oneOffToken}`;
      this.metadata = JSON.parse(
        data.supplemental_json_metadata.replace(/'/g, '"')
      );
      const supplementPath = data.is_described_by;

      this.supplemental_data = [
        {
          url: endpoint + `/${supplementPath}` + `?token=${oneOffToken}`,
        },
      ];
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.model-container .plot-container {
  height: 80vh;
}
</style>
