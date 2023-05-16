<template>
  <!-- <div class="resources-page">
    <breadcrumb-trail
      :breadcrumb="breadcrumb"
      :title="pageTitle.toUpperCase()"
    /> -->
    <!-- <div class="page-wrap">
      <div class="container">
        <client-only>
          <sphinx-page :baseURL="xmlURL" />
        </client-only>
      </div>
    </div> -->
  <!-- </div> -->
  <div class="page-outer">
    <breadcrumb-trail :breadcrumb="breadcrumb" :title="pageTitle" />
    <div class="container-default">
      <h1>Educational Resources</h1>
      <ul>
        <li>Overview of 12L project</li>
        <li>Some educational material on models (especially bond graph) and how things are connected. For now it can be proof of concept and updated later as the reduced order organ models are developed.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { SphinxPage } from "vue-sphinx-xml";

export default {
  name: "ResourcesPage",
  components: { SphinxPage },
  data: () => {
    return {
      pageTitle: "Educational Resources",
      breadcrumb: [
        {
          to: {
            name: "index",
          },
          label: "HOME",
        },
        {
          to: {
            name: "resources",
          },
          label: "RESOURCES",
        },
      ],
      xmlURL: undefined,
    };
  },

  created: function() {
    this.xmlURL = this.$config.twelve_labours_xml;
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/_layout.scss';
</style>
