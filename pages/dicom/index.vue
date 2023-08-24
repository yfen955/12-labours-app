<template>
  <client-only>
    <div id="app">
      <dicomViewer />
    </div>
  </client-only>
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

<style>
#app {
  text-align: center;
  height: 100vh;
}
</style>
