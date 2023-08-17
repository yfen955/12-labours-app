<template>
  <div id="app">
    <dicomViewer />
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

<style>
#app {
  text-align: center;
  height: 100vh;
}
</style>
