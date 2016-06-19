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
      getByYear: getByYear,
      getByYearWithOccurance: getByYearWithOccurance
    };

    return service;

    function getYears() {
      return dataService.get('years').then(function (result) {
        return result.years;
      });
    }

    function getByYear(year) {
      return dataService.get('years/' + year).then(function (result) {
        return result.items;
      });
    }

    function getByYearWithOccurance(year, occuranceType) {
      return dataService.get('years/' + year, {
        occurance: occuranceType
      }).then(function (result) {
        return result.items;
      });
    }
  }
})();
