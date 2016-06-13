(function() {
  'use strict';

  angular
      .module('app.layout')
      .directive('htTopNav', htTopNav);

  /* @ngInject */
  function htTopNav () {
    var directive = {
      bindToController: true,
      controller: 'topNavController',
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'navline': '='
      },
      templateUrl: 'app/layout/top-nav/ht-top-nav.html'
    };

    return directive;
  }
})();
