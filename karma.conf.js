// TODO: get rid of karma
var webpack = require('webpack');
var webpackConfig = require('./webpack.config')();

module.exports = function(config) {
  if (!config.debug) { config.debug = false; }
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './src',

    // frameworks to use
    // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],
    //a strip down config as karma watches the test entry points
    webpack: {
      devtool: 'eval',
      module: {
        rules: webpackConfig.module.rules.concat(
          // Because PhantomJS < v2.5 doesn't support ES6, we'll have to babelify
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
          }
        )
      },
      cache: true
    },

    // list of files / patterns to load in the browser
    // The order of patterns determines the order in which files are included in the browser.
    files: [
      // third-party files
      {pattern: '../node_modules/jquery/dist/jquery.min.js',  watched: false}, // require to extend angular.element for easier directive testing
      {pattern: '../node_modules/lodash/lodash.min.js', watched: false},
      {pattern: '../node_modules/moment/min/moment.min.js', watched: false},
      {pattern: '../node_modules/angular/angular.js', watched: false},
      {pattern: '../node_modules/angular-mocks/angular-mocks.js', watched: false},
      {pattern: '../node_modules/bardjs/dist/bard.js', watched: false},
      {pattern: '../bard-extension.js', watched: true},
      'specs/**/*.spec.js',
    ],
    // don't have to add the main module file
    exclude: ['app/index.js'],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'specs/**/*.spec.js': ['webpack', 'sourcemap']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: config.debug ? [] : ['progress'],
    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: 'html',
        fullTrace: true
      }
    },
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //        browsers: ['Chrome', 'ChromeCanary', 'FirefoxAurora', 'Safari', 'PhantomJS'],
    browsers: config.debug ? ['Chrome'] : ['PhantomJS'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: config.debug ? false : true,
    // web server port
    port: 7357,

    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.debug ? config.LOG_DISABLE : config.LOG_ERROR,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: config.debug ? true : false,

    webpackMiddleware: {
			// and use stats to turn off verbose output
      noInfo: true,
			stats: 'minimal'
		}
  });
};
