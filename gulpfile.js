var gulp = require('gulp');

var config = require('./config.json')['development'];

var $ = require('gulp-load-plugins')();

var browserSync = require('browser-sync');
var reload      = browserSync.reload;


var deploymentDir = 'dist/';

gulp.task('usemin', function(){
    return gulp.src(['app/*.html', '!app/_*.html'])
        .pipe($.usemin({
            css: [$.minifyCss(), 'concat'],
            js: [$.uglify()],
            html: [$.minifyHtml()]
        }))
        .pipe(gulp.dest(deploymentDir));
});
gulp.task('clean', function(){
    return gulp.src(deploymentDir, {read:false})
        .pipe($.clean());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.size({title: 'images before'}))
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size({title: 'images after'}));
});

//gulp.task('copy', function () {
//    return gulp.src([
//        'app/*',
//       // '!app/bower_components',
//        '!app/*.html'
//    ])
//        .pipe(gulp.dest(deploymentDir))
//        .pipe($.size({title: 'copy'}));
//
//})

gulp.task('deploy', function (cb) {
    $.runSequence('clean',['usemin', 'images'], 'serve:dist', cb )
})

gulp.task('serve', function () {
    browserSync({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['.tmp', config.static_dir]

        //proxy: config.host + ':' + config.port
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.css'], reload);
    gulp.watch(['app/scripts/**/*.js'], reload);
})

gulp.task('express', function () {
    $.express.run({
        file:'server.js',
        //env : 'production'
    });

    //gulp.watch(['./server.js'], ['express'])
})

gulp.task('serve:dist', function () {
    return browserSync({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: ['dist']
    });
})
