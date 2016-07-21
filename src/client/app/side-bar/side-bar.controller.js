(function () {
  'use strict';

  angular
      .module('app.sidebar')
      .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['sidebar'];
  /* @ngInject */
  function SidebarController(sidebar, logger) {
    var vm = this;
    activate();

    function activate() {
      vm.navOptions = setupOptions();
    }

    function setupOptions() {
      if (vm.items && vm.items.length > 0) {
        return sidebar.renderOptions(vm.items, sidebar.views.Budget);
      }
      return [];
    }
  }
})();
