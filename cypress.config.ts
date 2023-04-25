require("dotenv").config();
import { defineConfig } from "cypress";
const path = require("path");

export default defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  e2e: {
    baseUrl: "https://dev.ai.statusmoney.com/",
    viewportWidth: 1024,
    viewportHeight: 768,
    video: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    fixturesFolder: "cypress/fixtures",
    supportFile: "cypress/support/index.js",
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 20000,
    specPattern: ["cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        resolve: {
          alias: {
            // Must match path aliases in tsconfig.json
            "#": path.resolve(__dirname, "./"),
          },
        },
      },
    },
    specPattern: ["ui/**/*.cy.{js,jsx,ts,tsx}"],
  },
});
