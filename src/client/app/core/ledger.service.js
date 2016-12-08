//TODO: almost identical to budget! Maybe this should be refactored into a factory

(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('Ledger', ledgerService);

  ledgerService.$inject = ['dataService'];
  /* @ngInject */
  function ledgerService(dataService) {

    var service = {
      getYears: getYears,
      getByYear: getByYear,
      update: function() {alert('coming soon!')},
      add: add
    };

    return service;

    function getYears() {
      return dataService.get('ledgers/years').then(function (result) {
        return result.years;
      });
    }

    function getByYear(year) {
      return dataService.get('ledgers/years/' + year).then(function (result) {
        return result.items.map(function(item) {
          item.date = new Date(item.date);
          return item;
        });
      });
    }

    function add(year, item) {
      return dataService.post('ledgers/years/' + year, item);
    }
  }
})();
