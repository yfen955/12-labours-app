<template>      
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <section-with-image :title="pageTitle">
      <div v-if="error.statusCode==404">
        <p>I'm sorry but we can't find what you have been looking for. </p>
        <p>Maybe the page has moved - we suggest visiting the homepage to help you discover what you are looking for.</p>
      </div>
      <div v-else>
        <h3>Unexpected Error occurred</h3>
        <p>
          <b>Error Code: {{error.statusCode}}</b><br/>
          {{error.message}}
        </p>
      </div>
      <nuxt-link to="/">
        <el-button>Visit the Home Page</el-button>
      </nuxt-link>     
    </section-with-image>
    <portal-help/> 
  </div>
</template>

<script>

export default {
  name: 'ErrorPage',
  props: ['error'],

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