(function () {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$scope', 'sidebarservice', 'logger'];
    /* @ngInject */
    function SidebarController($scope, sidebarservice, logger) {
        var vm = this;
        activate();

        function activate() {
            vm.navOptions = setupOptions();
        }

        function setupOptions() {
            if (vm.items && vm.items.length > 0) {
                return sidebarservice.renderOptions(vm.items, sidebarservice.views.Budget);
            }
            return [];
        }
    }
})();
