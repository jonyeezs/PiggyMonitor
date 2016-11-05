(function () {
  'use strict';

  angular
      .module('app.core')
      .factory('Ledger', ledgerService);

  ledgerService.$inject = ['dataService'];
  /* @ngInject */
  function ledgerService(dataService) {

    var service = {
      get: getAll
    };

    return service;

    function getAll() {
      return dataService.get('ledgers/').then(function (result) {
        return result;
      });
    }
  }
})();
