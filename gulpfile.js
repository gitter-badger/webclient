/**
 * Gulp task files.
 */
// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require("gulp");
var runSequence = require("run-sequence");
require("gulp-watch");
var path = require("path");
var gutil = require("gulp-util");

// Variables
var srcFiles = path.join(__dirname, "/app/**");

/**
 * Error utils
 */
function sequenceComplete(done) {
  return function (err) {
    if (err) {
      var error = new Error("build sequence failed");
      error.showStack = false;
      done(error);
    }
    else {
      done();
    }
  };
}

/**
 * High level tasks
 */
// The default task
gulp.task("default", ["build", "watch"]);

// Main code quality task
gulp.task("codequality", function(cb) {
  runSequence("lint", "unit-test", "docs", sequenceComplete(cb));
});

// Build task
gulp.task("build", function() {
  gulp.start("codequality");
});

// Pre-commit task
gulp.task("pre-commit", function(cb) {
  runSequence("codequality", /*"enforce-coverage",*/ sequenceComplete(cb));
});

// Watch task
gulp.task("watch", function(cb) {
  runSequence("codequality", "watch-js", sequenceComplete(cb));
});

/**
 * Low level tasks
 */
// Watcher
gulp.task("watch-js", function () {
  gutil.log("File watch started");
  gulp.watch(srcFiles, function(vinyl) {
    gutil.log(gutil.colors.blue("(Watcher) File changed: " + vinyl.path));
    gulp.start("build");
  });
});

// ESLint
var eslint = require("gulp-eslint");
gulp.task("lint", function() {
  return gulp.src([srcFiles, path.join(__dirname, "/*.js")])
    .pipe(eslint())
    .pipe(eslint.format("stylish"))
    .pipe(eslint.failOnError());
});

// Unit testing
var karma = require("karma").server;
gulp.task("unit-test", function(done) {
  karma.start({
    configFile: path.join(__dirname, "/karma.conf.js"),
    singleRun: true
  }, function(exitStatus) {
    if (exitStatus) {
      gutil.log(gutil.colors.red("Error: Karma unit tests failed!"));
      throw "Build failed (unit tests)";
    }
    done();
  });
});

// Documentation
var yuidoc = require("gulp-yuidoc");
gulp.task("docs", function() {
  return gulp.src(srcFiles + "/!(*-spec).js")
    .pipe(yuidoc.parser())
    .pipe(yuidoc.reporter())
    .pipe(yuidoc.generator())
    .pipe(gulp.dest("./docs"));
});

// Code coverage
var coverageEnforcer = require("gulp-istanbul-enforcer");
gulp.task("enforce-coverage", function () {
  var options = {
    coverageDirectory: "coverage",
    rootDirectory: "",
    thresholds: {
      branches: 100,
      lines: 100,
      functions: 100,
      statements: 100
    }
  };
  return gulp
    .src(path.join(__dirname, "testreports/coverage/report-json/"))
    .pipe(coverageEnforcer(options));
});
