(function() {
  'use strict';

  angular
      .module('app.ledger')
      .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
            {
              state: 'ledger',
              config: {
                url: '/ledger',
                templateUrl: 'app/ledger/ledger.html',
                controller: 'LedgerController',
                controllerAs: 'vm',
                title: 'Ledger',
                settings: {
                  nav: 3,
                  content: 'Ledger'
                }
              }
            }
        ];
  }
})();
