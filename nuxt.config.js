export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '12-labours-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    graphcms_api: process.env.GRAPHCMS_ENDPOINT,

    social_twitter: process.env.SOCIAL_TWITTER || "https://twitter.com/12-labours",
    social_facebook: process.env.SOCIAL_FACEBOOK || "https://wwww.facebook.com/12-labours",
    social_linkedIn: process.env.SOCIAL_LINKEDIN || "https://www.linkedin.com/12-labours",
    social_youYube: process.env.SOCIAL_YOUTUBE || "https://www.youtube.com/12-labours"
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@abi-software/twelve-labours-design-system-components/dist/twelve-labours-design-system-components.css',
  ],

  //Improt scss resources to all pages/components
  styleResources: {
    scss: [
      '@abi-software/twelve-labours-design-system-components/src/assets/_variables.scss',
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/dsc',
    '@/plugins/graphcms.js',
    '@plugins/helpers'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/News',
      '~/components/Events'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
