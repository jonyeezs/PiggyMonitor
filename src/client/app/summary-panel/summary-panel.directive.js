(function() {
  'use strict';

  angular
      .module('app.summary')
      .directive('summaryPanel', summaryPanel);
  /* @ngInject */
  function summaryPanel () {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/summary-panel/summary-panel.html',
      scope: true,
      bindToController: {
        year: '='
      },
      controller: 'SummaryPanelController',
      controllerAs: 'vm'
    };
    return directive;
  }})();
