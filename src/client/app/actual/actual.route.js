module.exports = appRun;

appRun.$inject = ['routerHelper'];
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
