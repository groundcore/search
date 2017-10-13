var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var minify = require('gulp-minify');
 
gulp.task('compress:dist', function() {
  gulp.src('src/*.js')
    .pipe(minify({
        ext:{
            // src:'-src.js',
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function () {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('copy:dist', function () {
    gulp.src([
         'src/**/*'
    ],{ base: './src' })
        .pipe(gulp.dest('dist'));
});


// Default Task
gulp.task('default',function(callback) {
    runSequence(
        'clean:dist',
        'copy:dist',
        'compress:dist',
        function () {
            console.log('Done.');
        });
});