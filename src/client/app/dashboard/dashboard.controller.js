(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'logger'];
    /* @ngInject */
    function DashboardController($q, logger) {
        var vm = this;
        vm.news = {
            title: 'piggyMonitor',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getMessageCount(), getPeople()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            vm.messageCount = 10;
            return 10;
        }

        function getPeople() {
            vm.people = [];
        }
    }
})();
