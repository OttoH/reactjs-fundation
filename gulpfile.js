var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var path = require('path');

require("babel/register");

function handleError (err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task("browserify", function () {
    browserify({
        entries: './src/js/main.jsx',
        extensions: ['.jsx'],
        debug: true
    })
    .transform(babelify)
    .on('error', handleError)
    .bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .on('error', handleError)
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
  gulp.src('./src/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'src/less/main.less') ]
    }))
    .on('error', handleError)
    .pipe(gulp.dest('./dist/style'));
});

gulp.task('default',['browserify', 'copy', 'less']);
gulp.task('default-watch',['browserify', 'copy']);

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.*', ['default-watch']);
  gulp.watch('src/less/*.*', ['less']);
  gulp.watch('src/index.html', ['copy']);
});
