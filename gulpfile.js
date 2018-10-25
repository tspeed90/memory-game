const gulp = require('gulp');
const ts = require('gulp-typescript');
const memoryGame = ts.createProject('tsconfig.json');

gulp.task('default', () => {
  return memoryGame
    .src()
    .pipe(memoryGame())
    .js.pipe(gulp.dest('dist'));
});
