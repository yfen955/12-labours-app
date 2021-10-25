<template>
  <div class="resources-page">
    <breadcrumb-trail
      :breadcrumb="breadcrumb"
      :title="pageTitle.toUpperCase()"
    />
    <div class="page-wrap">
      <div class="container">
        <client-only>
          <sphinx-page baseURL="/docs" />
        </client-only>
      </div>
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
      pageTitle: "Resources",
      breadcrumb: [
        {
          to: {
            name: "index",
          },
          label: "HOME",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/_layout.scss';
</style>
