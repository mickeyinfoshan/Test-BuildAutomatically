var webpackConfig = require("../webpack.config.js");

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    files: ['./**/*.test.js'],
    frameworks: ['jasmine'],
    preprocessors: {
      './**/*.test.js' : ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      module : webpackConfig.module,
      watch : false
    },
    webpackServer: {
      noInfo: true,
    }
  });
};