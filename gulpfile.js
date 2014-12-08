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
        server: ['.tmp', 'app/'],
        scriptPath: function(path) {
            return 'scripts' + path;
        }
        //proxy: config.host + ':' + config.port
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.css'], reload);
    gulp.watch(['app/scripts/**/*.js'], reload);
})

//gulp.task('express', function () {
//    $.express.run({
//        file:'server.js',
//        //env : 'production'
//    });
//    console.log(config.host + ':' + config.port);
//    browserSync.init(null, {
//        //notify: false,
//        // Run as an https by uncommenting 'https: true'
//        // Note: this uses an unsigned certificate which on first access
//        //       will present a certificate warning in the browser.
//        // https: true,
//        proxy: config.host + ':' + config.port
//    });
//    gulp.watch(['app/views/**/*.jade'], reload);
//    gulp.watch(['app/styles/**/*.css'], reload);
//    gulp.watch(['app/scripts/**/*.js'], reload);
//
//    //gulp.watch(['./server.js'], ['express'])
//})


gulp.task('nodemon', function (cb) {
    var called = false;
    return $.nodemon({script: 'server.js'}).on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
});

gulp.task('browser-sync', function() {
     browserSync({
         notify: false,
        proxy: 'http://localhost:3000',// config.host + ":" + config.port,
        //scriptPath: function (path) {
        //    return "localhost:3002" + path;
        //}
        // files: ["server.js","routes.js","app/views/**/*.jade", "app/styles/**/*.css", "app/scripts/**/*.js"]
    });

    gulp.watch(['app/views/**/*.jade'], reload);
    gulp.watch(['app/styles/**/*.css'], reload);
    gulp.watch(['app/scripts/**/*.js'], reload);
});
gulp.task('watch',function() {
    //gulp.watch(['app/views/**/*.jade'], reload);
    //gulp.watch(['app/styles/**/*.css'], reload);
    //gulp.watch(['app/scripts/**/*.js'], reload);
});

gulp.task('default', function () {
    $.runSequence('nodemon', 'browser-sync', 'watch');

});
