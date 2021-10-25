import Vue from "vue";

import SphinxXml from "vue-sphinx-xml";
import VueKatex from "vue-katex";
import VueHighlightJS from "vue-highlightjs";

import "katex/dist/katex.min.css";
import "highlight.js/styles/xcode.css";

Vue.use(VueKatex);
Vue.use(VueHighlightJS);

export default async ({ store }) => {
  Vue.use(SphinxXml, { store });
};
