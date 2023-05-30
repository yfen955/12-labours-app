const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  projectId: "1hukkn",
  e2e: {
    baseUrl: process.env.PORTAL_URL,
    // pageLoadTimeout: 1024*1024*1024,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    query_url: process.env.QUERY_API_URL,
  },
});
