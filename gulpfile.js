var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('concat', function () {
    return gulp.src(['./js/game.js', './js/extension/*.js', './js/function/*.js', './js/callback/*.js'])
        .pipe(concat('game.js'))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('minify', function () {
    return gulp.src('./dist/game.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            noSource: true
        }))
        .pipe(gulp.dest('dist'));
});