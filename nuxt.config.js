export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "12-labours-app",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],

  },
  env: {
    graphcms_api: process.env.GRAPHCMS_ENDPOINT,
    google_analytics_ga4:process.env.GOOGLE_ANALYTICS_GA4,
    social_twitter:
      process.env.SOCIAL_TWITTER || "https://twitter.com/12-labours",
    social_facebook:
      process.env.SOCIAL_FACEBOOK || "https://wwww.facebook.com/12-labours",
    social_linkedIn:
      process.env.SOCIAL_LINKEDIN || "https://www.linkedin.com/12-labours",
    social_youYube:
      process.env.SOCIAL_YOUTUBE || "https://www.youtube.com/12-labours",
    twelve_labours_xml:
      process.env.TWELVE_LABOURS_XML,
    query_api_url: process.env.QUERY_API_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@abi-software/twelve-labours-design-system-components/dist/twelve-labours-design-system-components.css",
  ],

  //Improt scss resources to all pages/components
  styleResources: {
    scss: [
      "@abi-software/twelve-labours-design-system-components/src/assets/_variables.scss",
      "@/assets/_common.scss",
    ],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/dsc.js",
    "@/plugins/graphcms.js",
    "@/plugins/helpers.js",
    "@/plugins/vue-sphinx-xml.js",
    "@/plugins/validators.js",
    "@/plugins/vue-gtag.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      "~/components",
      "~/components/News",
      "~/components/Events",
      "~/components/PortalHelp",
      "~/components/Contact"
    ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  //Replace the route path for resources to work with vue-sphinx-xml.
  router: {
    extendRoutes(routes, resolve) {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].name === "resources-educational") {
          routes[i].path = "/resources/educational/:pageName*"
          return
        }
      }
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/toast"
  ],
  
  axios: {
    baseURL: process.env.API_URL || "http://localhost:8080",
    headers: {'Authorization':process.env.API_KEY}
  },

  auth: {
    watchLoggedIn:false,
    router: {
      middleware: ["auth"],
    },
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        codeChallengeMethod: '',  
        responseType: 'code',  
        grantType: 'authorization_code', 
        endpoints: {
          //token: `${process.env.API_URL}/user/google/login`, 
          userInfo: `${process.env.API_URL}/user/profile` 
        },
        token: {
          property:'access_token',
          global: true,
          name:'access_token'  
        },
        user: {
          property: 'user'
        },
      },
      local: {
        token: {
          global: true,
          property: 'access_token',     //Field of the response JSON to be used for value
          name:'access_token'           //Authorization header name to be used in axios requests. Default is 'Authorization'
        },
        user: {
          property: 'user',
          autoFetch:false
        },
        endpoints: {
          login: { url: '/user/local/login', method: 'post'},
          user: { url: '/user/profile', method: 'get'}
        },
      }
    },
    redirect: {
      callback: "/login/callback",
    },
  },
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },
};

console.log(process.env.API_URL)