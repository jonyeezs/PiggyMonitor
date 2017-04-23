module.exports =
  angular.module('app')
  .constant('config', {
    appTitle: 'piggyMonitor',
    dataUrl: 'http://localhost:9292/budgets'
  })
  .config(configure);

configure.$inject = ['$logProvider', 'routerHelperProvider', 'config'];
function configure($logProvider, routerHelperProvider, config) {
  if ($logProvider.debugEnabled) {
    $logProvider.debugEnabled(true);
  }
  routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
}
