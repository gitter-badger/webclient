module.exports = function () {
  var babelPreprocessor = file => require("babel").transform(file.content, {sourceMap: true});
  return {
    files: [
      {pattern: "node_modules/react-tools/src/test/phantomjs-shims.js", instrument: false},
      {pattern: "node_modules/jasmine-expect/dist/jasmine-matchers.js", instrument: false},
      {pattern: "node_modules/sinon/pkg/sinon.js", instrument: false},

      {pattern: "jspm_packages/system.js", instrument: false},
      {pattern: "config.js", instrument: false},

      {pattern: "app/**/*.js", load: false},
      "!app/**/*-spec.js"
    ],
    tests: [
      {pattern: "app/**/*-spec.js", load: false}
    ],

    preprocessors: {
      "app/**/*.js": babelPreprocessor
    },

    middleware: (app, express) => {
      app.use("/jspm_packages", express.static(require("path").join(__dirname, "jspm_packages")));
    },

    bootstrap: function (wallaby) {
      wallaby.delayStart();

      var promises = [];
      for (var i = 0, len = wallaby.tests.length; i < len; i++) {
        promises.push(System.import(wallaby.tests[i].replace(/\.js$/, "")));
      }

      Promise.all(promises).then(function () {
        wallaby.start();
      });
    }
  };
};
