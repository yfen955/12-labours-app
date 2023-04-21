<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Clinicians</h1>
      <br>
      <p>This website provides a valuable resource for clinicians by offering a computational modeling tool for medical research. Clinicians will be able to access/input medical imaging data to create computational models. The tool can help clinicians in making informed decisions for their patients, as well as support their ongoing research efforts.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CliniciansPage',
  data: () => {
    return {
      pageTitle: 'Clinicians',
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'Home'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
// 
</style>