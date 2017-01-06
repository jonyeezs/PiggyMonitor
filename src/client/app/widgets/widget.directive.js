(function() {
  'use strict';

  angular
      .module('app.widgets')
      .directive('widget', widget);

  /* @ngInject */
  function widget() {
    var directive = {
      scope: {
        'title': '@',
        'headingColour': '@',
        'subtitle': '@',
        'rightText': '@'
      },
      templateUrl: 'app/widgets/widget.html',
      restrict: 'E',
      transclude: true
    };
    return directive;
  }
})();
