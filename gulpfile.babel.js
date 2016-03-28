var gulp = require('gulp');
var mocha = require('gulp-mocha');

require('./test/compilers/css_modules.js');

process.env['NODE_PATH'] = './src';

gulp.task('test', function() {
  return gulp.src('./test/**/*.js', { read: false })
    .pipe(mocha());
});
