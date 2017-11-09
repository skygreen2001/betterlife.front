'use strict';

// Register the `layoutHeader` component on the `tk.layout` module
angular.
    module('bb.component.layout').
    component('layoutHeader', {
        templateUrl: 'template/layout/header/header.template.html',
        controller: ['Constants', '$window', 'ShareObject', 'ServerService',
        function(Constants, $window, ShareObject, ServerService, $scope, $element, $attrs) {
            var ctrl = this;
            this.$onInit = function() {
                this.userName = ShareObject.getUserName();
            };

            this.exit=function(){
                ShareObject.reset();
                if( Constants.DEV ){
                    ShareObject.setUserName('');
                    $window.location.href="#!/";
                    return;
                }

                ServerService.exit().then(function(res){
                    $window.location.href="#!/";
                    $window.location.reload();
                });
            }
        }]
    });
