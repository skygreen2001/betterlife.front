/* jshint node: true, strict: true */
'use strict';

/*=====================================
=        Default Configuration        =
=====================================*/

// Please use config.js to override these selectively:

var config = {
  isDev   : true,
  dest    : 'www',
  less: {
    src: [
      './src/less/bootstrap.less'
    ],
    paths: [
      './src/less'
    ]
  },
  vendor: {
    js: [
      './bower_components/angular/angular.js',
      './bower_components/angular-route/angular-route.js'
    ],

    css: []
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
    order          = require('gulp-order'),
    concat         = require('gulp-concat'),
    ignore         = require('gulp-ignore'),
    clean          = require('gulp-clean'),
    templateCache  = require('gulp-angular-templatecache'),
    mobilizer      = require('gulp-mobilizer'),
    ngAnnotate     = require('gulp-ng-annotate'),
    replace        = require('gulp-replace'),
    ngFilesort     = require('gulp-angular-filesort'),
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

/*=========================================
=            Clean dest folder            =
=========================================*/

gulp.task('clean', function (cb) {
  return gulp.src([
        path.join(config.dest, 'index.html'),
        path.join(config.dest, 'favicon.ico'),
        path.join(config.dest, 'data'),
        path.join(config.dest, 'template'),
        path.join(config.dest, 'images'),
        path.join(config.dest, 'css'),
        path.join(config.dest, 'js')
      ], { read: false })
     .pipe(clean({force: true}));
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
        .pipe(gulp.dest(path.join(config.dest, 'images')));
});


/*=====================================
=            Minify componet template            =
=====================================*/

gulp.task('template', function () {
  gulp.src([
      './src/templates/!(cache)*/*.html',
      './src/templates/*.html'
    ])
    .pipe(gulp.dest(path.join(config.dest, 'template')));

  return gulp.src('src/js/components/**/*.html')
        .pipe(gulp.dest(path.join(config.dest, 'template')));
});


/*=================================================
=            Copy html files to dest              =
=================================================*/

gulp.task('html', function() {
  var inject = [], injectBefore = [], injectCss = [], injectCssBefore = [];

  //引入Roboto字体
  var css_roboto = "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic";
  injectCss.push('<link rel="stylesheet" href="' + css_roboto + '">');

  injectBefore.push('<script src="js/bower/bower.min.js"></script>');

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
      basename: "app",
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(config.dest, 'css')));
});


/*====================================================================
=            Compile and minify js generating source maps            =
====================================================================*/
// - Precompile templates to ng templateCache

gulp.task('js', function() {
  var jsTask;
  if (firstInit){
    jsTask = gulp.src(config.vendor.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bower.js'))
    .pipe(ngAnnotate());

    if (!config.isDev) jsTask.pipe(uglify());

    jsTask
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.dest, 'js', 'bower')));
  }

  jsTask = streamqueue(
    { objectMode: true },
    // gulp.src(config.vendor.js),
    gulp.src('./src/js/**/*.js').pipe(ngFilesort()),
    gulp.src(['./src/templates/cache/**/*.html']).pipe(templateCache('bower/templates.js', { module: 'bb' }))
  )
  .pipe(sourcemaps.init())
  .pipe(concat('app.js'))
  .pipe(ngAnnotate());

  if (!config.isDev) jsTask.pipe(uglify());

  jsTask
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('.'))
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
  gulp.watch(['./src/js/**/*', './src/templates/cache/**/*.html'], ['js']);
  gulp.watch(['./src/images/**/*'], ['img']);
  gulp.watch(['./src/js/**/*.html', './src/templates/!(cache)*/*.html', './src/templates/*.html'], ['template']);
});

/*======================================
=            Build Sequence            =
======================================*/

gulp.task('build', function(done) {
  var tasks = ['images','template', 'less', 'js', 'data'];
  // tasks.push('install');
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
