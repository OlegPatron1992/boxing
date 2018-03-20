var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function() {
    return gulp.src(['./js/game.js', './js/extension/*.js', './js/function/*.js', './js/callback/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});