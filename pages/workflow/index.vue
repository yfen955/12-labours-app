<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Workflows</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkflowsPage',
  data: () => {
    return {
      pageTitle: 'Workflows',
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