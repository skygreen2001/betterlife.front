'use strict';

// Define the `cs article` module
angular.
  module('csArticle', ['ngRoute', 'ngFileUpload', 'cs.domain.share', 'cs.service']).
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
