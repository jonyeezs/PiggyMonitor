(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('articleTable', articleTable);

  articleTable.$inject = ['categoryFactory'];

  function articleTable(categoryFactory) {
    var directive = {
      templateUrl: 'app/widgets/article-table/article-table.html',
      restrict: 'EA',
      scope: {
        items: '=',
        year: '<'
      },
      link: function (scope) {
        scope.sortType = '';
        scope.sortReverse = false;
        scope.$watchCollection('items', function(newItems, oldItems) {
          scope.categories = categoryFactory.createLabels(newItems);
        });
      }
    };
    return directive;
  }
})();
