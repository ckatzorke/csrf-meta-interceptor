/*jslint node: true,  nomen: true */


var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify');

/*
 * clean
 */
gulp.task('clean', function() {
    'use strict';
    return gulp.src(['dist/'], {
        read: false
    }).pipe(rimraf());
});
/*
 * ESLint
 */
gulp.task('lint', function() {
    'use strict';
    return gulp.src(['*.js', 'src/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], function() {
    'use strict';
    //
});

gulp.task('compress', ['clean', 'test'], function() {
    'use strict';
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

/**
 * default
 */
gulp.task('default', ['compress'], function() {
    'use strict';
    // default stuff
});
