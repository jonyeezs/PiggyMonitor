module.exports = appRun;

appRun.$inject = ['routerHelper'];

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
          content: 'Budget'
        }
      }
    }
  ];
}
