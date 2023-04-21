<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Technical Resources</h1>
      Some info on CellML and MAPclient, etc. Mostly some documentation. It can be the same as SPARC.
    </div>
  </div>
</template>

<script>
export default {
  name: "TechnicalResources",
  data: () => {
    return {
      pageTitle: "Technical Resources",
      breadcrumb: [
        {
          to: { name: "index" },
          label: "Home",
        },
        {
          to: { name: "resources" },
          label: "Resources",
        },
      ],
    }
  }
}
</script>

<style scoped lang="scss">
// 
</style>