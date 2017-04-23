module.exports = appRun;

appRun.$inject = ['routerHelper'];
function appRun(routerHelper) {
  routerHelper.configureStates(getStates());
}

function getStates() {
  return [
    {
      state: 'dashboard',
      config: {
        url: '/',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        title: 'dashboard',
        settings: {
          nav: 1,
          content: 'Dashboard'
        }
      }
    }
  ];
}
