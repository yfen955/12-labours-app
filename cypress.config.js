const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    // pageLoadTimeout: 1024*1024*1024,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
