import Vue from "vue";

import SphinxXml from "vue-sphinx-xml";
import VueKatex from "vue-katex";

import "katex/dist/katex.min.css";

Vue.use(VueKatex);

export default async ({ store }) => {
  Vue.use(SphinxXml, { store });
};
