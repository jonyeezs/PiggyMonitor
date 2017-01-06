(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[piggyMonitor Error] ',
    appTitle: 'piggyMonitor',
    dataUrl: 'http://localhost:9292'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$logProvider', '$qProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];
  /* @ngInject */
  function configure($logProvider, $qProvider, routerHelperProvider, exceptionHandlerProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    $qProvider.errorOnUnhandledRejections(false); //TODO: remove this and put catches into all promises

    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({docTitle: config.appTitle + ': '});
  }

})();
