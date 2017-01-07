(function() {
  'use strict';

  angular
      .module('app.actual')
      .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
            {
              state: 'actual',
              config: {
                url: '/actual',
                templateUrl: 'app/actual/actual.html',
                controller: 'ActualController',
                controllerAs: 'vm',
                title: 'Actual',
                settings: {
                  nav: 3,
                  content: 'Actual'
                }
              }
            }
        ];
  }
})();
