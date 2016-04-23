(function() {
    'use strict';

    angular
        .module('app.budget')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'budget',
                config: {
                    url: '/budget',
                    templateUrl: 'app/budget/budget.html',
                    controller: 'BudgetController',
                    controllerAs: 'vm',
                    title: 'Budget',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Budget'
                    }
                }
            }
        ];
    }
})();
