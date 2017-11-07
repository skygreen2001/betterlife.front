'use strict';

angular.
  module('bb.controllers').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
       $routeProvider.
         when('/blog/edit', {
           template: '<blog-edit></blog-edit>', reloadOnSearch: false
         }).
         when('/blog/view', {
           template: '<blog-view></blog-view>', reloadOnSearch: false
         });
    }
  ]);

angular.
  module('bb.controllers').
  controller('BlogController',
    function(ShareObject, Constants, ServerService, $scope, $location, $element, $attrs) {
      var ctrl = this;
      // this.lastModified = $_.now();
      this.lastModified = $_.wxnow();

      this.nickName     = ShareObject.getUserName();

      this.showSharePay = function(){
        console.log("It's good to share!");
      };

      this.$onInit = function() {
      };
    }
  ).
  component('blogView', {
    templateUrl: 'html/core/blog/view.html',
    controller: ['ShareObject', 'Constants', 'ServerService',
    function(ShareObject, Constants, ServerService, $scope, $element, $attrs) {
      this.blogId = ShareObject.getBlogId();
      var ctrl = this;

    }]
  }).
  component('blogEdit', {
    templateUrl: 'html/core/blog/edit.html',
    controller: ['ShareObject', 'Constants', 'ServerService',
    function(ShareObject, Constants, ServerService, $scope, $element, $attrs) {
      this.blogId = ShareObject.getBlogId();
      var ctrl = this;

    }]
  });
