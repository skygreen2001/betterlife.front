'use strict';

angular.
  module('bb.controllers').
  controller('AboutController',
    function($scope, $window, $document, $location, ShareObject, Constants) {
      var nav_tabs_about_top = $("#nav-tabs-about").position().top;
      $(".scrollable-content").on('scroll', function(){
        // console.log("scrolltop:"+$(this).scrollTop()+";target:"+position.top);
        if ($(this).scrollTop() >= nav_tabs_about_top){
          $("#nav-tabs-about").addClass("scrollable-header");
        } else {
          $("#nav-tabs-about").removeClass("scrollable-header");
        }
      })
    }
  );
