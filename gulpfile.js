// Basic setup
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');    // zemljevid stisnjenih datotek
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');

// Styles Task
/**
 * 1. Preberi .css datoteke
 * 2. Prečisti CSS
 * 3. Združi .css datoteke v eno datoteko
 * 4. Zapiši styles.css v /dist mapo
 */
gulp.task('styles', function () {
    return gulp.src('app/css/*.css')                // 1. Preberi .css datoteke
        .pipe(sourcemaps.init())                    // naredi zemljevid stisnjenih datotek z source datoteko
        .pipe(cleanCSS({compatibility: 'ie8'}))     // 2. Prečisti CSS
        .pipe(concat('styles.css'))                 // 3. Združi .css datoteke v eno datoteko
        .pipe(sourcemaps.write('maps'))             // zapiše zemljevid stisnjenih datotek
        .pipe(gulp.dest('dist'));                   // 4. Zapiši styles.css v /dist mapo
        
});

// Less Task
gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('less.css'))
        .pipe(gulp.dest('dist'));
});

// Script Task
gulp.task('scripts', function () {
    return gulp.src('app/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
        
});

// Clean Task
gulp.task('clean', function(cb){
    return del(['dist/*'], cb);
});

// Image Task
gulp.task('images', function(){
   return gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

// Watch Task
/**
 * Opravilo naj preverja spremembe v izvornih datotekah (APP)
 */
gulp.task('watch', function(){
    gulp.watch('app/css/*.css', gulp.series('styles'));
    gulp.watch('app/less/*.less', gulp.series('less'));
    gulp.watch('app/js/*.js', gulp.series('scripts'));
    gulp.watch('app/img/*', gulp.series('images'));
});

// Default Task
gulp.task('default', gulp.series('clean', 'styles', 'less', 'scripts', 'images','watch'));