<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Workflow</h1>
      <nuxt-link :to="{
        name: 'data-browser-dataset-id',
        params: {
          id: 'dataset-76-version-7',
        },
        query: {
          datasetTab: 'abstract',
        }
      }">
        View
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Workflow',
  data: () => {
    return {
      pageTitle: 'Workflows',
      breadcrumb: [
        {
          to: { name: 'index' },
          label: 'Home'
        },
        {
          to: { name: 'data' },
          label: 'Data & Models'
        },
      ],
    }
  },
}
</script>
