<template>
  <div class="page-outer">
    <client-only>
      <dicomViewer :study="study" :series="series" />
    </client-only>
  </div>
</template>

<script>
import backendQuery from "@/services/backendQuery";

export default {
  name: "DicomViewer",
  components: {
    dicomViewer: process.client
      ? () => import("../../../../components/Dicom/dwv")
      : null,
  },
  data: () => {
    return {
      study: undefined,
      series: undefined,
    };
  },
  async fetch() {
    const data = await backendQuery.getSingleData(
      this.$config.query_api_url,
      this.$route.params.id
    );
    const filename = data["filename"].split("/");
    this.study = filename[1].split("-")[1];
    this.series = filename[2].split("-")[1];
  },

  mounted() {
    this.$fetch();
  },
};
</script>

<style></style>
