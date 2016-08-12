var webpackConfig = require('./webpack.config'); // eslint-disable-line no-var

module.exports = function karmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'test/**/*.spec.js',
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.spec.js': ['webpack'],
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
