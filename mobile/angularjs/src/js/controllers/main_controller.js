'use strict';

angular.
  module('bb.controllers').
  controller('MainController',
    function($scope, $location, ShareObject, Constants) {
      var queryParams = $location.search();
      if (queryParams.userId) {
        ShareObject.setUserId(queryParams.userId);
      }

      $scope.appName    = Constants.APP_NAME;
      $scope.appVersion = Constants.App_Version;

      // User agent displayed in home page
      $scope.userAgent = navigator.userAgent;

      $scope.layout   = Constants.LAYOUT;
      $scope.isNavbar = false;
      $scope.isSearch  = false;
    }
  );
