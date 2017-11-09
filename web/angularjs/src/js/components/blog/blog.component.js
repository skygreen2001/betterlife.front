'use strict';

angular.
  module('bb.component.blog', ['ngRoute', 'bb.service']).
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
  module('bb.component.blog').
  component('blogList', {
    templateUrl: 'template/blog/template/list.template.html',
    controller: ['ShareObject', 'Constants', 'ServerService',
    function(ShareObject, Constants, ServerService, $scope, $element, $attrs) {
      var ctrl = this;

    }]
  }).
  component('blogView', {
    templateUrl: 'template/blog/template/view.template.html',
    controller: ['ShareObject', 'Constants', 'ServerService',
    function(ShareObject, Constants, ServerService, $scope, $element, $attrs) {
      this.blogId = ShareObject.getBlogId();
      var ctrl = this;

    }]
  }).
  component('blogList', {
    templateUrl: 'template/blog/template/edit.template.html',
    controller: ['ShareObject', 'Constants', 'ServerService',
    function(ShareObject, Constants, ServerService, $scope, $element, $attrs) {
      this.blogId = ShareObject.getBlogId();
      var ctrl = this;

    }]
  });
