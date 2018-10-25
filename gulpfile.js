const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');
const paths = {
  pages: ['public/*.html']
};

gulp.task('copy-html', function copyHtml() {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});

gulp.task(
  'default',
  gulp.series(gulp.parallel('copy-html'), function bundleCode() {
    return browserify({
      basedir: '.',
      debug: true,
      entries: ['public/dom.ts'],
      cache: {},
      packageCache: {}
    })
      .plugin(tsify)
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist'));
  })
);
