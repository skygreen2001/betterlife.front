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
      './bower_components/jquery/dist/jquery.min.js'
    ],

    fonts: [
      './bower_components/bootstrap/fonts/glyphicons-halflings-regular.*'
    ]
  },

  server: {
    host: '0.0.0.0',
    port: '8000'
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

var gulp           = require('gulp'),

    bower          = require('gulp-bower'),

    seq            = require('run-sequence'),
    connect        = require('gulp-connect'),
    less           = require('gulp-less'),
    uglify         = require('gulp-uglify'),
    sourcemaps     = require('gulp-sourcemaps'),
    cssmin         = require('gulp-cssmin'),
    image          = require('gulp-image'),
    order          = require('gulp-order'),
    concat         = require('gulp-concat'),
    ignore         = require('gulp-ignore'),
    clean          = require('gulp-clean'),
    mobilizer      = require('gulp-mobilizer'),
    replace        = require('gulp-replace'),
    streamqueue    = require('streamqueue'),
    rename         = require('gulp-rename'),
    path           = require('path');

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
  return bower({});
});


/*==========================================
=            Start a web server            =
==========================================*/

gulp.task('connect', function() {
  if (typeof config.server === 'object') {
    connect.server({
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
    .pipe(connect.reload());
});

var firstInit = true;
/*=====================================
=            Minify images            =
=====================================*/

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
        .pipe(image())
        .pipe(gulp.dest(path.join(config.dest, 'images')));
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

  injectCssBefore.push('<link rel="stylesheet" href="css/common.min.css">');

  injectBefore.push('<script src="js/base.min.js"></script>');
  inject.push('<script src="js/bower/bower.min.js"></script>');

  gulp.src('./src/images/favicon.ico')
  .pipe(gulp.dest(config.dest));

  gulp.src(['./src/html/**/*.html'])
  .pipe(replace('<!-- inject:css:before -->', injectCssBefore.join('\n    ')))
  .pipe(replace('<!-- inject:css -->', injectCss.join('\n    ')))
  .pipe(replace('<!-- inject:js:before -->', injectBefore.join('\n    ')))
  .pipe(replace('<!-- inject:js -->', inject.join('\n    ')))
  .pipe(gulp.dest(config.dest));
});


/*======================================================================
=            Compile, minify, mobilize less                            =
======================================================================*/

gulp.task('less', function () {

  var cssTask;
  cssTask = gulp.src(config.less.src).pipe(less({
    paths: config.less.paths.map(function(p){
      return path.resolve(__dirname, p);
    })
  }))
  .pipe(mobilizer('bootstrap.css', {
    'bootstrap.css': {
      screens: 'any'
    }
  }));

  if (!config.isDev) cssTask = cssTask.pipe(cssmin({keepSpecialComments : 0}));

  return cssTask
    .pipe(rename({
      basename: "common",
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
    .pipe(sourcemaps.init())
    .pipe(concat('bower.js'));

    if ( !config.isDev ) jsTask.pipe(uglify());

    jsTask
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js', 'bower')));
  }

  jsTask = streamqueue(
    { objectMode: true },
    gulp.src('./src/js/base/**/*.js')
  )
  .pipe(sourcemaps.init())
  .pipe(concat('base.js'));

  if (!config.isDev) jsTask.pipe(uglify());

  jsTask
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(path.join(config.dest, 'js')));

  jsTask = gulp.src([
    './src/js/*.js',
    './src/js/!base/**/*.js'
  ]);

  if (!config.isDev) jsTask.pipe(uglify());

  jsTask
  .pipe(rename({suffix: '.min'}))
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
