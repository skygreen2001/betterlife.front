'use strict';

// Register the `layoutLeft` component on the `tk.layout` module
angular.
    module('bb.component.layout').
    component('layoutLeft', {
        transclude: true,
        templateUrl: 'template/layout/left/left.template.html',
        controller: ['Constants', 'ShareObject', 'SharedState', 'ServerService', '$location', '$scope', '$rootScope',
        function(Constants, ShareObject, SharedState, ServerService, $location, $scope, $rootScope, $element, $attrs) {
            var ctrl = this;

            this.$onInit = function(){

            };

        }]
    });
