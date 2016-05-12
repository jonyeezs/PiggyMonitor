(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('budgetService', budgetService);

    budgetService.$inject = ['dataService'];
    /* @ngInject */
    function budgetService(dataService) {

        var service = {
            getYears: getYears,
            getAll: getAll
        };

        return service;

        function getYears() {
            return dataService.get('years').then(function(result){
                return result.years;
            });
        }

        function getAll(year) {
            return dataService.get('years/' + year).then(function(result){
                return result.items;
            });
        }
    }
})();
