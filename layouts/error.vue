<template>      
  <div class="outer-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <section-with-image :title="pageTitle">
      <div>
        <p>
          I’m sorry but we can’t find what you have been looking for. 
        </p>
        <p>
         Maybe the page has moved - we suggest visiting the homepage to help you discover what you are looking for.
        </p>
        <nuxt-link to="/">
          <el-button>Visit the Home Page</el-button>
        </nuxt-link>     
      </div>
    </section-with-image>
    <portal-help/> 
  </div>
</template>

<script>

export default {
  name: 'ErrorPage',

  data: () => {
    return {
      pageTitle: 'Page Not Found',
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

<style lang="scss" scoped>

</style>