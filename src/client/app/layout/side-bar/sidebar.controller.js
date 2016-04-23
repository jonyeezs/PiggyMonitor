(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$state', 'routerHelper', 'logger'];
    /* @ngInject */
    function SidebarController($state, routerHelper, logger) {
        var vm = this;
        var states = routerHelper.getStates();
        vm.changeScreen = changeScreen;
        vm.sidebarReady = sidebarReady;
        activate();

        function activate() { getPageOptions(); }

        function getPageOptions() {
            vm.navOptions = sideBarSetup($state.current);
        }

        function changeScreen(option){
            logger.info('Activated Admin View');
        }
        function sidebarReady(){
            return true;
        }
        function sideBarSetup(current){
            return [
                    {
                        name: 'all',
                        content: '<i class="fa fa-dashboard"></i> all'
                    },
                    {
                        name: 'income',
                        content: '<i class="fa fa-dashboard"></i> income'
                    }
                ];
        }
    }
})();
