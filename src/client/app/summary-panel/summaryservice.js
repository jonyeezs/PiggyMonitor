(function () {
    'use strict';

    angular
        .module('app.summary')
        .factory('summaryservice', summaryservice);

    summaryservice.$inject = ['_', '$rootScope', 'categoryFactory'];
    /* @ngInject */
    function summaryservice(_, $rootScope, categoryFactory) {

        var items;
        var service = {
            publish: publish,
            getExpenses: getExpenses,
            getIncome: getIncome
        };

        return service;

        function publish(list) {
            items = list;
            $rootScope.$broadcast('summaryUpdated');
        }

        function getExpenses(){
            return categoryFactory.createExpense(items);
        }

        function getIncome(){
            return categoryFactory.createIncome(items);
        }
    }
})();
