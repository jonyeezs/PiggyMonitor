(function () {
  'use strict';

  angular
      .module('app.widgets')
      .directive('articleTable', articleTable);

  function articleTable() {
    var directive = {
      templateUrl: 'app/widgets/article-table/articletable.html',
      restrict: 'EA',
      scope: {
        items: '='
      },
      link: function (scope) {
        scope.sortType = '';
        scope.sortReverse = false;
      }
    };
    return directive;
  }
})();
