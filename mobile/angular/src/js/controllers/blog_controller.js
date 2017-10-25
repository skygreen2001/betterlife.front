'use strict';

angular.
  module('bb.controllers').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
       $routeProvider.
         when('/editBlog', {
           template: '<blog-edit></blog-edit>'
         }).
         when('/viewBlog', {
           template: '<blog-view></blog-view>'
         });
    }
  ]);

angular.
  module('bb.controllers').
  controller('BlogController',
    function(ShareObject, Constants, ServerService, $scope, $location, $element, $attrs) {
      var ctrl = this;
      this.lastModified = $_.now();

      this.nickName     = ShareObject.getUserName();

      this.showSharePay = function(){
        console.log("It's good to share!");
      };

      this.$onInit = function() {
      };
    }
  ).
  component('blogView', {
    templateUrl: 'html/blog/view.html',
    controller: ['ShareObject', 'Constants', 'ServerService',
    function(ShareObject, Constants, ServerService, $scope, $element, $attrs) {
      this.blogId = ShareObject.getBlogId();
      var ctrl = this;

    }]
  }).
  component('blogList', {
    templateUrl: 'html/blog/edit.html',
    controller: ['ShareObject', 'Constants', 'ServerService',
    function(ShareObject, Constants, ServerService, $scope, $element, $attrs) {
      this.blogId = ShareObject.getBlogId();
      var ctrl = this;

    }]
  });
