'use strict';

angular.module('bb.service', [
    'ngResource'
]);

angular.module('bb.controllers', [
    'mobile-angular-ui',
    'angularUtils.directives.dirPagination',
    'ngFileUpload',
    'bbBlog'
]);

//
// Here is how to define your module
// has dependent on mobile-angular-ui
//
var app=angular.module('bb', [
  'ngRoute',
  'bb.controllers.main',
  'bb.service'
]);

app.run();

app.config(['$locationProvider', '$routeProvider', '$httpProvider',
  function($locationProvider, $routeProvider, $httpProvider) {
    // //所有的异步都不需要自动序列化成JSON格式
    // $httpProvider.defaults.transformRequest = function(data) {
    //   使用jQuery的param方法把JSON数据转换成字符串形式
    //   return $.param(data);
    //   todo: 采用angular的方式实现$.param jqlite没有作用？
    // };

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

    // $locationProvider.html5Mode(true);
    // $locationProvider.html5Mode({enabled:true,requireBase:false,rewriteLinks:false});

    $routeProvider.
      when('/', {
        templateUrl:'home.html',  reloadOnSearch: false
      }).
      when('/edit', {
        templateUrl: 'edit.html', reloadOnSearch: false
      }).
      when('/view', {
        templateUrl: 'view.html', reloadOnSearch: false
      }).
      otherwise('/');
  }
]);
