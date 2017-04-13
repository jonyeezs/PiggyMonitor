module.exports =
  angular.module('app')
  .config(toastrConfig)
  .config(configure)
  .value('config', config);

toastrConfig.$inject = ['toastr'];
function toastrConfig(toastr) {
  toastr.options.timeOut = 4000;
  toastr.options.positionClass = 'toast-bottom-right';
}

var config = {
  appTitle: 'piggyMonitor',
  dataUrl: 'http://localhost:9292/budgets'
};

configure.$inject = ['$logProvider', 'routerHelperProvider'];
function configure($logProvider, routerHelperProvider) {
  if ($logProvider.debugEnabled) {
    $logProvider.debugEnabled(true);
  }
  routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
}
