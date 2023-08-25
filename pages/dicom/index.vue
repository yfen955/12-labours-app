<template>
  <div class="page-outer">
    <client-only>
      <dicomViewer />
    </client-only>
  </div>
</template>

<script>
export default {
  name: "DicomViewer",
  components: {
    dicomViewer: process.client
      ? () => import("../../components/Dicom/dwv")
      : null,
  },
};
</script>

<style></style>
