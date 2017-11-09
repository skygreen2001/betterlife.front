'use strict';

angular.
  module('bb.controllers').
  controller('MainController',
    function($scope, $location, ShareObject, Constants) {
      var queryParams = $location.search();
      if (queryParams.userId) {
        ShareObject.setUserId(queryParams.userId);
      }
      $scope.appName = Constants.APP_NAME;
    }
  );
