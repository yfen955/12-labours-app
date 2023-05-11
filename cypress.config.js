const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "12-labours-app",
  e2e: {
    baseUrl: 'http://localhost:3000',
    // pageLoadTimeout: 1024*1024*1024,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    query_url: 'https://abi-12-labours-api.herokuapp.com',
  },
});
