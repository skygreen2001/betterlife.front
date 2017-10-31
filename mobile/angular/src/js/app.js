'use strict';

angular.module('bb.service', [

]);

angular.module('bb.controllers', [
  'ngRoute',
  'bb.service'
]);

// 定义应用 app
var app = angular.module('bb', [
  'ngRoute',
  'ngResource',
  'ngStorage',
  'ngCookies',

  'mobile-angular-ui',
  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures',

  'bb.service',
  'bb.controllers'
]);

// app.run();

app.run(function($transform) {
  window.$transform = $transform;
});

app.config(['$locationProvider', '$routeProvider', '$httpProvider',
  function($locationProvider, $routeProvider, $httpProvider) {
    // //所有的异步都不需要自动序列化成JSON格式
    // $httpProvider.defaults.transformRequest = function(data) {
    //   使用jQuery的param方法把JSON数据转换成字符串形式
    //   return $.param(data);
    //   todo: 采用angular的方式实现$.param jqlite没有作用？
    // };

    //angular1.6默认给hash路由上添加了!(感叹号),导致出错;(添加该配置,去掉默认前缀感叹号)
    $locationProvider.hashPrefix("");

    // $locationProvider.hashPrefix("!");
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    // $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

    // $locationProvider.html5Mode(true);
    // $locationProvider.html5Mode({enabled:true,requireBase:false,rewriteLinks:false});

    $routeProvider.
      when('/', {
        templateUrl: 'html/home.html',  reloadOnSearch: false
      }).
      when('/music', {
        templateUrl: 'html/core/music/index.html', reloadOnSearch: false
      }).
      when('/photo', {
        templateUrl: 'html/core/photo/index.html', reloadOnSearch: false
      }).
      when('/news', {
        templateUrl: 'html/core/news/index.html', reloadOnSearch: false
      }).
      when('/blog', {
        templateUrl: 'html/core/blog/index.html', reloadOnSearch: false
      }).
      when('/lab', {
        templateUrl: 'html/core/lab/index.html', reloadOnSearch: false
      }).
      when('/my', {
        templateUrl: 'html/core/my/index.html', reloadOnSearch: false
      }).
      otherwise('/');
  }
]);

app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});

app.directive('go', ['$window',
    function($window, $scope) {
        return function(scope, element ,attrs) {
            element.bind('mousedown', function() {
                $window.location.href = attrs.go;
            });
        }
    }
]);
