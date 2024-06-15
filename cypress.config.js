const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: '8ww3rj',
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3000',
  },
});
