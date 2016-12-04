'use strict';

// Define the `bf article` module
angular.
  module('bbArticle', ['ngRoute', 'ngFileUpload', 'bb.domain.share', 'bb.service']).
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
       $routeProvider.
         when('/editContent', {
           template: '<publish-edit></publish-edit>'
         }).
         when('/editTitle', {
           template: '<publish-title></publish-title>'
         });
    }
  ]);
