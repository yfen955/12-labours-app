<template>      
  <div class="outer-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default shaded">
      <h1 class="top-heading">
        PAGE NOT FOUND
      </h1>
      <div class="default-inner">
        <span>
          I’m sorry but we can’t find what you have been looking for.<br/><br/>
          Maybe the page has moved - we suggest visiting the homepage to help you discover what you are looking for.
        </span>
        <div class="nav-button">
          <nuxt-link to="/">
            <el-button>
              VISIT THE HOMEPAGE
            </el-button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <portal-help hide-bg-color/> 
  </div>
</template>

<script>

export default {
  name: 'ErrorPage',

  data: () => {
    return {
      pageTitle: 'PAGE NOT FOUND',
      breadcrumb: [
        {
          to: {
            name: 'index'
          },
          label: 'HOME'
        }
      ],
    }
  }
}
</script>

<style lang="scss" scoped>

.nav-button{
  padding-top:32px;
  padding-bottom:140px;
}

</style>