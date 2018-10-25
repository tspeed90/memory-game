const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const tsify = require('tsify');
const gutil = require('gulp-util');
const paths = {
  pages: ['public/*.html']
};
const browserifyOptions = {
  basedir: '.',
  debug: true,
  entries: ['public/dom.ts'],
  cache: {},
  packageCache: {}
};

const watchedBrowserify = watchify(browserify(browserifyOptions).plugin(tsify));

gulp.task('copy-html', function copyHtml() {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

function buildDist(browserifyObject) {
  return browserifyObject
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}

function bundleAndWatch() {
  return buildDist(watchedBrowserify);
}

gulp.task(
  'bundle',
  gulp.series(gulp.parallel('copy-html'), function bundle() {
    return buildDist(browserify(browserifyOptions).plugin(tsify));
  })
);

gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundleAndWatch));
watchedBrowserify.on('update', bundleAndWatch);
watchedBrowserify.on('log', gutil.log);
