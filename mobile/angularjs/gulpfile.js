/* jshint node: true, strict: true */
'use strict';

/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  isDev   : true,
  isImage : true,
  dest    : 'www',
  less: {
    src: [
      './src/less/bootstrap.less'
    ],
    paths: [
      './src/less', './bower_components'
    ]
  },
  vendor: {
    js: [
      './bower_components/angular/angular.js',
      './bower_components/angular-route/angular-route.js',
      './bower_components/mobile-angular-ui/dist/js/mobile-angular-ui.js'
    ],

    css: [],

    images: [
      './bower_components/jquery-weui/dist/demos/images/**'
    ],

    fonts: [
      './bower_components/font-awesome/fonts/fontawesome-webfont.*'
    ]
  },

  server: {
    host: '0.0.0.0',
    port: '9000'
  }
};

if (require('fs').existsSync('./config.js')) {
  var configFn = require('./config');
  configFn(config);
}

/*-----  End of Configuration  ------*/


/*========================================
=            Requiring stuffs            =
========================================*/

var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    path = require('path'),
    seq  = require('run-sequence'),
    strip= require('gulp-strip-comments'),
    streamqueue = require('streamqueue'),
    bowerFiles  = require('main-bower-files');

/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('error', function(e) {
  throw(e);
});


/*=========================================
=          Setup Bower Library            =
=========================================*/

gulp.task('bower', function (cb) {
  return $.bower({});
});

/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function (cb) {
  if (config.isImage) {
    gulp.src(path.join(config.dest, 'images'), { read: false })
       .pipe($.clean({force: true}));
  }
  return gulp.src([
        path.join(config.dest, 'index.html'),
        path.join(config.dest, 'favicon.ico'),
        path.join(config.dest, 'data'),
        path.join(config.dest, 'css'),
        path.join(config.dest, 'js'),
        path.join(config.dest, 'html')
      ], { read: false })
     .pipe($.clean({force: true}));
});


/*==========================================
=            Start a web server            =
==========================================*/

gulp.task('connect', function() {
  if (typeof config.server === 'object') {
    $.connect.server({
      root: config.dest,
      host: config.server.host,
      port: config.server.port,
      livereload: true
    });
  } else {
    throw new Error('Connect is not configured');
  }
});


/*==============================================================
=            Setup live reloading on source changes            =
==============================================================*/

gulp.task('livereload', function () {
  gulp.src(path.join(config.dest, '*.html'))
    .pipe($.connect.reload());
});

var firstInit = true;
/*=====================================
=            Minify images            =
=====================================*/

gulp.task('images', function () {
  gulp.src('./src/img/favicon.ico')
  .pipe(gulp.dest(config.dest));

  gulp.src(['src/img/!(phonegap)*/**/*', 'src/img/*.*'])
  // .pipe(image())
  .pipe(gulp.dest(path.join(config.dest, 'img')));

  return gulp.src(config.vendor.images)
         .pipe(gulp.dest(path.join(config.dest, 'img', "weui")));
});

/*==================================
=            Copy fonts            =
==================================*/
gulp.task('fonts', function() {
  return gulp.src(config.vendor.fonts)
        .pipe(gulp.dest(path.join(config.dest, 'fonts')));
});

/*=================================================
=            Copy html files to dest              =
=================================================*/

gulp.task('html', function() {
  var inject = [], injectBefore = [], injectCss = [], injectCssBefore = [];

  // injectCssBefore.push('<link rel="stylesheet" href="css/bower.min.css">');
  // injectBefore.push('<script src="js/bower/bower.min.js"></script>');

  var htmlTask = gulp.src(['./src/html/**/*.html'])
      .pipe($.replace('<!-- inject:css:before -->', injectCssBefore.join('\n    ')))
      .pipe($.replace('<!-- inject:css -->', injectCss.join('\n    ')))
      .pipe($.replace('<!-- inject:js:before -->', injectBefore.join('\n    ')))
      .pipe($.replace('<!-- inject:js -->', inject.join('\n    ')));

  if (!config.isDev) htmlTask.pipe(strip());

  htmlTask.pipe(gulp.dest(config.dest));
});


/*======================================================================
=            Compile, minify, mobilize less                            =
======================================================================*/

gulp.task('less', function () {
  if ( firstInit ) {
    gulp.src(config.vendor.css)
    .pipe($.concat('bower.css'))
    .pipe($.cssmin({keepSpecialComments : 0}))
    .pipe($.rename({
      basename: "bower",
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(config.dest, 'css')));
  }

  var cssTask;
  cssTask = gulp.src(config.less.src).pipe($.less({
    paths: config.less.paths.map(function(p){
      return path.resolve(__dirname, p);
    })
  }))
  .pipe($.mobilizer('bootstrap.css', {
    'bootstrap.css': {
      screens: 'any'
    }
  }));

  if (!config.isDev) cssTask = cssTask.pipe($.cssmin({keepSpecialComments : 0}));

  return cssTask
    .pipe($.rename({
      basename: "app",
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(config.dest, 'css')));
});


/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/

gulp.task('js', function() {
  var jsTask;
  if ( firstInit ) {
    jsTask = gulp.src(config.vendor.js)
    .pipe($.sourcemaps.init())
    .pipe($.concat('bower.js'))
    .pipe($.ngAnnotate());

    if ( !config.isDev ) jsTask.pipe($.uglify());

    jsTask
    .pipe($.rename({suffix: '.min'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js', 'bower')));//, 'bower'
  }

  jsTask = streamqueue(
    { objectMode: true },
    // gulp.src(config.vendor.js),
    gulp.src('./src/js/**/*.js').pipe($.angularFilesort())
  )
  .pipe($.sourcemaps.init())
  .pipe($.concat('app.js'))
  .pipe($.ngAnnotate());

  if (!config.isDev) jsTask.pipe($.uglify());

  jsTask
  .pipe($.rename({suffix: '.min'}))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest(path.join(config.dest, 'js')));

  firstInit = false;
});

/*====================================================================
=            mimic server request response json data                 =
====================================================================*/
gulp.task('data', function() {
    gulp.src('./data/*')
    .pipe(gulp.dest(path.join(config.dest, 'data')));
});

/*===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function () {
  if (typeof config.server === 'object') {
    gulp.watch([config.dest + '/**/*'], ['livereload']);
  }
  gulp.watch(['./data/*'], ['data']);
  gulp.watch(['./src/html/**/*'], ['html']);
  gulp.watch(['./src/less/**/*'], ['less']);
  gulp.watch(['./src/js/**/*'], ['js']);
  if (config.isImage) gulp.watch(['./src/images/**/*'], ['images']);
});

/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done) {
  var tasks = ['fonts', 'less', 'js', 'data'];
  if (config.isImage) tasks.push('images');
  seq('html', tasks, done);
});

/*======================================
=            Install Sequence          =
======================================*/

gulp.task('install', function(done) {
  var tasks = ['bower'];
  seq(tasks, done);
});

/*====================================
=            Default Task            =
====================================*/

gulp.task('default', ['clean'], function(done){
  var tasks = [];

  tasks.push('build');

  if (typeof config.server === 'object') {
    tasks.push('connect');
  }

  tasks.push('watch');

  seq('install', tasks, done);
});
