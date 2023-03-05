require('dotenv').config();
import {defineConfig} from "cypress";
const path = require('path');

export default defineConfig({
  projectId: process.env.CYPRESS_PROJECT_ID,
  e2e: {
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
        }
      }
    },
    specPattern: ["ui/**/*.cy.{js,jsx,ts,tsx}"],
  },
});
