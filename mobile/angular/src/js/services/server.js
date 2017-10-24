angular.
  module('bb.service').
  service('ServerService', ['$resource', 'ShareObject', '$http', '$httpParamSerializerJQLike',
    function($resource, ShareObject, $http, $httpParamSerializerJQLike) {

      // 退出登录
      this.exit = function() {
          return $http({
              method: 'GET',
              url: Constants.SERVER_RUN + 'logout',
              headers: {
                  'Content-Type': "application/json"
              },
               data: ""
          });
      };
    }
  ]);
