<template>
  <div class="container-default">
    <div class="border-container">
      <div class="title-box">
        <h1>Plot Viewer</h1>
        <CopyLink />
      </div>
      
      <client-only placeholder="Loading Plot ...">
        <div class="plot-container">
          <plot-vuer
            :data-source="{ url: source_url }"
            :metadata="metadata"
            :supplemental-data="supplemental_data"
          />
        </div>
      </client-only>
    </div>
    
  </div>
</template>

<script>
import CopyLink from "../../../../components/Map/copyLink";
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';
import fetchModel from "../fetchModel";

export default {
  name: 'PlotViewer',
  components: {
    PlotVuer: process.client
      ? () => import('@abi-software/plotvuer').then(m => m.PlotVuer)
      : null,
    CopyLink
  },
  props: [ "id" ],
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
    let data = await fetchModel.fetchModelInfo(this.$route.params.id, this.$store);
    let filename = data.filename;
    let dataset_id = data.experiments[0].submitter_id;
    this.source_url = `${process.env.query_api_url}data/download/datasets/${dataset_id}/${filename}`;
    this.metadata = eval("(" + data.supplemental_json_metadata + ")");
    let supplementPath = data.is_described_by;
    this.supplemental_data = [{url: `${process.env.query_api_url}data/download/datasets/${supplementPath}`}];
    this.isLoading = false;
  },
}
</script>

<style scoped lang="scss">
.border-container {
  border: 1px solid #E4E7ED;
}
.title-box {
  display: flex;
  justify-content: space-between;
  margin: .5em 0 .5em;
  
  h1 {
    margin-top: .5em;
    margin-left: 1em;
  }
}

</style>