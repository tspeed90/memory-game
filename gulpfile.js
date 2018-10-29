const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const tsify = require('tsify');
const gutil = require('gulp-util');
const ts = require('gulp-typescript');
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

function buildDist(browserifyObject) {
  return browserifyObject
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}

function bundleAndWatch() {
  return buildDist(watchedBrowserify);
}

const serverProject = ts.createProject('./src/tsconfig.json');

gulp.task('copy-html', function copyHtml() {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

gulp.task('server', () => {
  return gulp
    .src('./src/*.ts')
    .pipe(serverProject())
    .pipe(gulp.dest('dist'));
});

gulp.task(
  'bundle',
  gulp.series(
    'copy-html',
    gulp.parallel('server', function bundle() {
      return buildDist(browserify(browserifyOptions).plugin(tsify));
    })
  )
);

gulp.task(
  'default',
  gulp.series('copy-html', gulp.parallel('server', bundleAndWatch))
);
watchedBrowserify.on('update', bundleAndWatch);
watchedBrowserify.on('log', gutil.log);
