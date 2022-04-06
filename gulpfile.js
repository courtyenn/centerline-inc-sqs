const { src, dest, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const lessify = require('gulp-less');
const path = require('path');

function buildJS() {
  // place code for your default task here

  return src('index.js')
    .pipe(uglify())
    .pipe(dest('build/'))
}

function buildCSS() {
  return src('./custom.less')
    .pipe(lessify())
    .pipe(dest('build/'));
}


exports.default = parallel([buildJS, buildCSS]);