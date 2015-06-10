// karma.conf.js
module.exports = function(config) {
  config.set({
    logLevel: config.LOG_INFO, // LOG_DEBUG / LOG_INFO
    basePath: ".",
    frameworks: ["jspm", "jasmine", "jasmine-matchers", "sinon"],
    autoWatch: (process.env.isCI) ? false : true,
    // web server port
    port: 9876,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: (process.env.isCI) ? true : false,

    jspm: {
      config: "config.js",
      loadFiles: ["app/**/*-spec.js"],
      serveFiles: ["app/**/!(*-spec).js"]
    },

    // list of files to exclude
    exclude: [],

    preprocessors: {
      "app/**/*-spec.js": ["babel"],
      "app/**/!(*-spec|main).js": ["babel", "coverage"]
    },
    babelPreprocessor: {
      options: {
        modules: "system",
        sourceMap: "inline"
      }
    },
    reporters: ["dots", "coverage", "html"],
    colors: true,
    // Configure coverage reporter
    coverageReporter: {
      dir: "testreports/coverage/",
      includeAllSources: true,
      reporters: [
        {type: "html", subdir: "report-html"},
        {type: "json", subdir: "report-json"}
      ]
    },

    // Configure html reporter
    htmlReporter: {
      outputFile: "testreports/unittest_report.html",

      // Optional
      pageTitle: "LeavyLip webclient",
      subPageTitle: "Unit test report"
    },

    browsers: (process.env.isCI) ?
      // Browsers to test in CI environment
      ["PhantomJS", "Firefox", "Chrome"]
      // Browsers to test in local dev environment
      : ["PhantomJS"],
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: false
    }
  });
};
