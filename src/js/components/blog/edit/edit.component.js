'use strict';

// Register the `publishEdit` component on the `bfArticle` module,
angular.
  module('bbBlog').
  component('blogEdit', {
    templateUrl: 'template/blog/edit/edit.template.html',
    controller: ['$http', 'ShareObject', 'ServerService', '$location', '$window',
      function($http, ShareObject, ServerService, $location, $window, $scope, $element, $attrs) {
        this.content = ShareObject.getContent();
        var ctrl = this;
        this.saveContent = function(){
          ServerService.saveShareItem(
            ctrl.content
          ).then(function(response) {
            var shareId = ShareObject.getShareId(),
                userId = ShareObject.getUserId();
            $window.location.href = "#/edit?shareId=" + shareId + "&userId=" + userId;
          });
        };
      }
    ]
  }).
  component('blogTitle', {
    templateUrl: 'template/blog/edit/title.template.html',
    controller: ['$http', '$routeParams', 'ShareObject', 'ServerService', '$location', '$window',
      function($http, $routeParams, ShareObject, ServerService, $location, $window, $scope, $httpParamSerializerJQLike, $element, $attrs) {
        this.title = ShareObject.getTitle();
        var ctrl=this;
        this.saveTitle = function() {
          var saveShare = ServerService.saveShare(
            ctrl.title
          );
          if (saveShare) {
            saveShare.then(function(response) {
              ShareObject.setShareId(response.data);
              // console.log( "shareId:" + response.data );
              var shareId = response.data,
                  userId = ShareObject.getUserId();
              $window.location.href = "#/edit?shareId=" + shareId + "&userId=" + userId;
            });
          }
        }
      }
    ]
  });
