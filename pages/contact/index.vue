<template>
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <section-with-image :title="formTitle">
      <div>
        <p>
          Use the form below to submit your inquiry. 
        </p>
        <p>
          For other topics such as Frequently Asked Questions, Help documentation or Glossary updates, visit our 
          <nuxt-link to="/help">Help</nuxt-link> page. 
        </p>
        <p>
          For feedback on the 12 Labours Portal website please use the <nuxt-link to="/site-feedback">Site Feedback form</nuxt-link>.
        </p>
      </div>
    </section-with-image> 
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
    }
  }
}
</script>

<style scoped lang="scss">

</style>
