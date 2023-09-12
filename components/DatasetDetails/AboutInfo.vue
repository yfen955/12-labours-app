<template>
  <div>
    <h2>About this dataset</h2>
    <p><b>Title:</b> {{ title }}</p>
    <p>
      <b>First Published:</b>
      {{ detail_data.created_datetime ?
        detail_data.created_datetime.slice(0, 10) :
        "N/A" }}
    </p>
    <p>
      <b>Last Published:</b>
      {{ detail_data.updated_datetime ?
        detail_data.updated_datetime.slice(0, 10) :
        "N/A" }}
    </p>
    <!-- <hr />
    <p><b>Contact Author:</b> N/A</p>
    <hr />
    <p><b>Award(s):</b> N/A</p>
    <hr />
    <p><b>Associated project(s):</b> N/A</p>
    <p><b>Institution(s):</b> N/A</p>
    <hr />
    <h2>About this version</h2>
    <p><b>Version 3 Revision 1:</b> N/A</p>
    <p><b>Dataset DOI:</b> N/A</p> -->
  </div>
</template>

<script>
export default {
  name: "AboutInfo",
  props: [ "detail_data", "title" ],
}
</script>

<style scoped lang="scss">
// 
</style>