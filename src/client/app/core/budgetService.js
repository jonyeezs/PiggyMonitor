(function () {
  'use strict';

  angular
      .module('app.core')
      .factory('budget', budgetService);

  budgetService.$inject = ['dataService'];
  /* @ngInject */
  function budgetService(dataService) {

    var service = {
      getYears: getYears,
      getByYear: getByYear,
      getByYearWithOccurance: getByYearWithOccurance,
      update: update,
      add: add
    };

    return service;

    function getYears() {
      return dataService.get('years').then(function (result) {
        return result.years;
      });
    }

    //TODO: should try use a raml generator
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

    function update(year, item) {
      return dataService.patch('years/' + year, [item]);
    }

    function add(year, item) {
      return dataService.post('years/' + year, item);
    }
  }
})();
