
import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  Vue.use(VueGtag, {
    config: { id: process.env.google_analytics_ga4 },
    appName: '12-labours-app',
  }, app.router)
}