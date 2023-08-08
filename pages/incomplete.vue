<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <section-with-image :title="pageTitle">
      <p>The requested featrures will be implemented soon.</p>
      <nuxt-link to="/">
        <el-button>Visit the Home Page</el-button>
      </nuxt-link>
    </section-with-image>
    <portal-help/>
  </div>
</template>

<script>
export default {
  name: 'IncompletePage',
  data: () => {
    return {
      pageTitle: 'Feature not implement',
      breadcrumb: [
        {
          to: {
            name: 'index'
          },
          label: 'Home'
        }
      ]
    }
  }
}
</script>

<style>

</style>