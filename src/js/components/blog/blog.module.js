'use strict';

// Define the `bbBlog` module
angular.
  module('bbBlog', ['ngRoute', 'ngFileUpload', 'bb.service']).
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
       $routeProvider.
         when('/editContent', {
           template: '<blog-edit></blog-edit>'
         }).
         when('/editTitle', {
           template: '<blog-title></blog-title>'
         });
    }
  ]);
