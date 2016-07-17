(function() {
  'use strict';

  angular
      .module('app.layout')
      .controller('topNavController', TopNavController);

  TopNavController.$inject = ['$state', 'routerHelper'];
  /* @ngInject */
  function TopNavController($state, routerHelper) {
    var vm = this;
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;

    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    /**
     * Returns the class name for the selected route
     * @method isCurrent
     * @param  {{title: string}}  route created from the page's route.js
     * @return {string}       returns 'current' if it matches to the $state.current's title else an empty string
     */
    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
  }
})();
