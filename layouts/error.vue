<template>      
  <div class="outer-page">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <section-with-image
      :title="pageTitle"
      :contents="pageContent"
      :navigation-buttons="navigation"/>
    <portal-help/> 
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
      pageContent:[{
        html:`I’m sorry but we can’t find what you have been looking for.<br/><br/>
        Maybe the page has moved - we suggest visiting the homepage to help you discover what you are looking for.`
      }],
      navigation:[
        {linkCaption:'Visit the HomePage',linkTo:'/'}
      ]
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