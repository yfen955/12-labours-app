<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <section-with-image
      :title="formTitle"
      :contents="termsOfService"
    /> 
    <div class="container-default">

    </div>
  </div>
</template>


<script>

export default {
  name: 'ContactPage',

  data: () => {
    return {
      pageTitle: 'Contact',
      breadcrumb: [
        {
          to: {name: 'index'},
          label: 'Home'
        }
      ],
      formTitle:'Contact us',
      termsOfService:'Use the form below'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
