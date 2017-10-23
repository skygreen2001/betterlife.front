'use strict';

angular.
  module('bb.service').
  factory('ShareObject', ['Constants', '$localStorage',
    function(Constants, $localStorage){
      return {
        setUserId: function(userId) {
          $localStorage.userId = userId;
        },
        getUserId: function() {
          return $localStorage.userId;
        },
        setBlogId: function(shareIdInt) {
          shareId = shareIdInt;
        },
        getBlogId: function() {
          return shareId;
        },
        setUserName: function(userName){
            $localStorage.userName = userName;
        },
        getUserName: function(){
            if(empty($localStorage.userName)) $localStorage.userName = Constants.USERNAME;
            return $localStorage.userName;
        },
        reset: function(){
            $localStorage.$reset();
        }
      };
    }]
  );
