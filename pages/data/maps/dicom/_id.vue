<template>
  <div class="page-outer">
    <client-only>
      <dicomViewer v-if="!isLoading" :study="study" :series="series" />
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
      isLoading: false,
      study: undefined,
      series: undefined,
    };
  },
  created() {
    this.handleStudySeries();
  },
  methods: {
    handleStudySeries: async function() {
      this.isLoading = true;
      const data = await backendQuery.getSingleData(
        this.$config.query_api_url,
        this.$route.params.id
      );
      const filename = data["filename"].split("/");
      this.study = filename[1].split("-")[1];
      this.series = filename[2].split("-")[1];
      this.isLoading = false;
    },
  },
};
</script>

<style></style>
