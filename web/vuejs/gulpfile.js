/* jshint node: true, strict: true */
'use strict';

/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  isDev: true,
  dest : 'www',
  css  : [
    // './bower_components/animate.css/animate.min.css',
    './bower_components/font-awesome/css/font-awesome.min.css',
    './node_modules/view-design/dist/styles/iview.css'
  ],
  js: {
    all: [
      './bower_components/Modernizr/modernizr.js',
      './bower_components/lodash/dist/lodash.min.js',
      './bower_components/axios/dist/axios.min.js',
      './bower_components/velocity/velocity.js',
      './bower_components/jquery/dist/jquery.min.js'
    ],
    dev: [
      './bower_components/vue/dist/vue.js',
      './node_modules/view-design/dist/iview.js'
    ],
    prod: [
      './bower_components/vue/dist/vue.min.js',
      './node_modules/view-design/dist/iview.min.js'
    ]
  },
  fonts: [
    // './bower_components/font-awesome/fonts/fontawesome-webfont.*',
    './node_modules/view-design/dist/styles/fonts/ionicons.*'
      // './bower_components/bootstrap/fonts/glyphicons-halflings-regular.*',
    // './bower_components/icomoon-bower/fonts/icomoon.*'
  ],
  server: {
    host: '127.0.0.1',
    port: '6001'
  }

};

/*-----  End of Configuration  ------*/

/*========================================
=            Requiring stuffs            =
========================================*/
var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    path = require('path'),
    seq  = require('run-sequence'),
    strip= require('gulp-strip-comments'),
    streamqueue = require('streamqueue');

/*================================================
=            Report Errors to Console            =
================================================*/

gulp.on('error', function(e) {
  throw(e);
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
  gulp.src(path.join(config.dest, 'html'))
  .pipe($.connect.reload());
});

var firstInit = true;

/*==================================
=            Copy fonts            =
==================================*/

gulp.task('fonts', function() {

  return gulp.src(config.fonts)
        .pipe(gulp.dest(path.join(config.dest, 'css', 'fonts')));
});

/*======================================================================
=            Compile, minify css                            =
======================================================================*/

gulp.task('css', function () {
  var cssTask;
  cssTask = gulp.src(config.css)
  .pipe($.concat('common.css'))
  .pipe(gulp.dest(path.join(config.dest, 'css')))
  .pipe($.cssmin({keepSpecialComments : 0}));

  cssTask
    .pipe($.rename({
      basename: "common",
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(config.dest, 'css')));

});


/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/

gulp.task('js', function() {

  if ( firstInit ) {
    var allJs = config.js.all;
    if (config.isDev){
      allJs = allJs.concat(config.js.dev);
    } else{
      allJs = allJs.concat(config.js.prod);
    }
    debugger;
    gulp.src(allJs)
    .pipe($.sourcemaps.init())
    .pipe($.concat('bower.js'))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js', 'common')));
  }
  firstInit = false;
});

/*===================================================================
=            Watch for source changes and rebuild/reload            =
===================================================================*/

gulp.task('watch', function () {
  if (typeof config.server === 'object') {
    gulp.watch([config.dest + '/**/*'], ['livereload']);
  }
});

/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done) {
  var tasks = ['fonts', 'css', 'js'];
  seq(tasks, done);
});

/*======================================
=            Install Sequence          =
======================================*/

gulp.task('install', function() {
  // Setup Bower Library
  $.bower({});

});

/*====================================
=            Default Task            =
====================================*/

gulp.task('default', function(done){
  var tasks = [];

  tasks.push('install');

  tasks.push('build');

  if (typeof config.server === 'object') {
    tasks.push('connect');
  }

  tasks.push('watch');

  seq(tasks, done);
});
