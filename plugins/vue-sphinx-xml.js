import Vue from "vue";

import SphinxXml from "vue-sphinx-xml";

export default async ({ store }) => {
  Vue.use(SphinxXml, { store });
};
