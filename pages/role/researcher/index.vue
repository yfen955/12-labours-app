<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Researchers</h1>
      <br>
      <p>This website offers computational modelling tools aimed at advancing personalised medicine and clinical research. Researchers can utilise the tool to support their studies and gain insights into various medical conditions.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearchersPage',
  data: () => {
    return {
      pageTitle: 'Researchers',
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