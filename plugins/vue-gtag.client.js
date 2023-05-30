import Vue from "vue";
import VueGtag from "vue-gtag";

export default ({ app, $config: { google_analytics_ga4 } }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: google_analytics_ga4 },
      appName: "12-labours-app",
    },
    app.router
  );
};
