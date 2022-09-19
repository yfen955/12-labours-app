<template>
  <div class="container-default">
    <div class="border-container">
      <div class="title-container">
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
import backendQuery from '@/services/backendQuery';
import CopyLink from "../../../../components/Map/copyLink";
import '@abi-software/scaffoldvuer/dist/scaffoldvuer.css';

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
    let data = await backendQuery.fetchGraphqlData('manifest', {}, `${this.$route.params.id}`, 100, 1);
    data = data[0][0];
    let dataset_id = data.experiments[0].submitter_id;
    let filename = data.filename;
    this.source_url = `${process.env.query_api_url}download/data/datasets/${dataset_id}/${filename}`;
    this.metadata = eval("(" + data.supplemental_json_metadata + ")");
    let supplementPath = data.is_described_by;
    this.supplemental_data = [{url: `${process.env.query_api_url}download/data/datasets/${supplementPath}`}];
    this.isLoading = false;
  },
}
</script>

<style scoped lang="scss">
.border-container {
  border: 1px solid #E4E7ED;
}
.title-container {
  display: flex;
  h1 {
    margin-top: .5em;
    margin-left: 1em;
  }
}

</style>