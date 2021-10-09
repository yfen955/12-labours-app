<template>
  <div class="resources-page">
    <breadcrumb-trail
      :breadcrumb="breadcrumb"
      :title="pageTitle.toUpperCase()"
    />
    <client-only>
      <sphinx-page baseURL="/docs" />
    </client-only>
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

<style scoped lang="scss"></style>
