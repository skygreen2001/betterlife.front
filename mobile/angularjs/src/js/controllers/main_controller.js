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

      //
      // Right Sidebar
      //
      $scope.chatUsers = [
        {name: 'Carlos  Flowers', online: true},
        {name: 'Byron Taylor', online: true},
        {name: 'Jana  Terry', online: true},
        {name: 'Darryl  Stone', online: true},
        {name: 'Fannie  Carlson', online: true},
        {name: 'Holly Nguyen', online: true},
        {name: 'Bill  Chavez', online: true},
        {name: 'Veronica  Maxwell', online: true},
        {name: 'Jessica Webster', online: true},
        {name: 'Jackie  Barton', online: true},
        {name: 'Crystal Drake', online: false},
        {name: 'Milton  Dean', online: false},
        {name: 'Joann Johnston', online: false},
        {name: 'Cora  Vaughn', online: false},
        {name: 'Nina  Briggs', online: false},
        {name: 'Casey Turner', online: false},
        {name: 'Jimmie  Wilson', online: false},
        {name: 'Nathaniel Steele', online: false},
        {name: 'Aubrey  Cole', online: false},
        {name: 'Donnie  Summers', online: false},
        {name: 'Kate  Myers', online: false},
        {name: 'Priscilla Hawkins', online: false},
        {name: 'Joe Barker', online: false},
        {name: 'Lee Norman', online: false},
        {name: 'Ebony Rice', online: false}
      ];
    }
  );
