(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('sideBar', sideBar);
    /* @ngInject */
    function sideBar () {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/side-bar/sidebar.html',
            scope: true,
            bindToController: {
                items: '='
            },
            controller: 'SidebarController',
            controllerAs: 'vm'
        };
        return directive;
    }})();
