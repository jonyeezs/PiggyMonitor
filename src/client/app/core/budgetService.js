(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('budgetService', budgetService);

    budgetService.$inject = ['_', 'sidebarservice','dataservice', '$q', 'exception', 'logger'];
    /* @ngInject */
    function budgetService(_, sidebarservice, dataservice, $q, exception, logger) {

        var service = {
            getYears: getYears,
            getAll: getAll
        };

        return service;

        function getYears() {
            return dataservice.get('years').then(function(result){
                return result.years;
            });
        }

        function getAll(year) {
            return dataservice.get('years/' + year).then(function(result){
                sidebarservice.setView(sidebarservice.views.Budget);
                publishCategories(result.budget.items);
                return result.budget.items;
            });
        }

        function publishCategories(items){
            var categories = getCategories(items);
            sidebarservice.update(categories);
        }

        function getCategories(items){
            return _(items).map('category').uniq().value();
        }
    }
})();
