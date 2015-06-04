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
 * High level tasks
 */
// The default task
gulp.task("default", ["build", "watch"]);

// Main code quality task
gulp.task("codequality", function(cb) {
  runSequence(["lint", "unit-test", "docs"], cb);
});

// Build task
gulp.task("build", function(cb) {
  runSequence(["codequality"], cb);
});

// Pre-commit task
gulp.task("pre-commit", function(cb) {
  runSequence(["codequality", "enforce-coverage"], cb);
});

/**
 * Low level tasks
 */
// Watcher
gulp.task("watch", function () {
  gulp.watch(srcFiles, function() {
    gulp.start("build")
    .on("error", function swallowError () {
      this.emit("end");
    });
  });
});

// ESLint
var eslint = require("gulp-eslint");
gulp.task("lint", function() {
  return gulp.src([srcFiles, path.join(__dirname, "/*.js")])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .on("error", function swallowError () {
      this.emit("end");
    });
});

// Unit testing
var karma = require("karma").server;
gulp.task("unit-test", function(done) {
  karma.start({
    configFile: path.join(__dirname, "/karma.conf.js"),
    singleRun: true
  }, done);
});

// Documentation
var yuidoc = require("gulp-yuidoc");
gulp.task("docs", function() {
  return gulp.src(srcFiles + "/!(*-spec).js")
    .pipe(yuidoc())
    .pipe(gulp.dest("./docs"))
    .on("error", gutil.log);
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
    .pipe(coverageEnforcer(options))
    .on("error", function swallowError (err) {
      gutil.log(err.message);
      this.emit("end");
    });
});
