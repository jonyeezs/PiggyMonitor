module.exports =  angular.module('app')
  .component('appShell', {
    template: require('./shell.html'),
    controller: ShellController
  })
  .name;

// $rootScope to communicate directly with the landing page
ShellController.$inject = ['$rootScope', '$timeout', 'config', 'logger'];
function ShellController($rootScope, $timeout, config, logger) {
  var vm = this;
  vm.busyMessage = 'Please wait ...';
  vm.isBusy = true;
  $rootScope.showSplash = true;
  vm.navline = {
    title: config.appTitle
  };

  activate();

  function activate() {
    logger.success(config.appTitle + ' loaded!');
    hideSplash();
  }

  function hideSplash() {
    //Force a 1 second delay so we can see the splash.
    $timeout(function() {
      $rootScope.showSplash = false;
    }, 1000);
  }
}
