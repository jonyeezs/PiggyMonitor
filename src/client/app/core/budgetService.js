(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('Budget', budgetService);

  budgetService.$inject = ['dataService'];
  /* @ngInject */
  function budgetService(dataService) {

    var service = {
      getYears: getYears,
      getCategoriesForYear: getCategories,
      getByYear: getByYear,
      getByYearWithOccurance: getByYearWithOccurance,
      update: update,
      add: add,
      getStatement: getStatement
    };

    return service;

    function getYears() {
      return dataService.get('budgets/years').then(function (result) {
        return result.years;
      });
    }

    //TODO: should try use a raml generator
    function getByYear(year) {
      return dataService.get('budgets/years/' + year).then(function (result) {
        return result.items;
      });
    }

    function getCategories(year) {
      return dataService.get('budgets/categories/' + year).then(function (result) {
        return result.categories;
      })
    }

    function getByYearWithOccurance(year, occuranceType) {
      return dataService.get('budgets/years/' + year, {
        occurance: occuranceType
      }).then(function (result) {
        return result.items;
      });
    }

    function update(year, items) {
      return dataService.patch('budgets/years/' + year, items);
    }

    function add(year, item) {
      return dataService.post('budgets/years/' + year, item);
    }

    function getStatement(year, occurance) {
      return dataService.get('budgets/years/' + year + '/summary', {
        as_statement: 1,
        occurance: occurance
      }).then(function (result) {
        return result.summary.breakdowns;
      });
    }
  }
})();
