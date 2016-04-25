(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$scope', 'sidebarservice', 'logger'];
    /* @ngInject */
    function SidebarController($scope, sidebarservice, logger) {
        var vm = this;
        vm.changeScreen = changeScreen;
        vm.sidebarReady = sidebarReady;
        activate();

        function activate() {
            $scope.$on('sidebarOptionsUpdated', getPageOptions);
            getPageOptions();
         }

        function getPageOptions() {
            vm.navOptions = sideBarSetup();
        }

        function changeScreen(option){
            logger.info('Activated Admin View');
        }
        function sidebarReady(){
            return false;
        }
        function sideBarSetup(){
            return sidebarservice.get();
        }
    }
})();
