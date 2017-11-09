'use strict';

angular.
  module('bb.service').
  factory('ShareObject', ['Constants', '$localStorage',
    function(Constants, $localStorage){
      var shareId;
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
          if ($_.empty(shareId)) shareId=1;
          return shareId;
        },
        setUserName: function(userName){
            $localStorage.userName = userName;
        },
        getUserName: function(){
            if($_.empty($localStorage.userName)) $localStorage.userName = Constants.USERNAME;
            return $localStorage.userName;
        },
        reset: function(){
            $localStorage.$reset();
        }
      };
    }]
  );
