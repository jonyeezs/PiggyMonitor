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
        scope.addItem = false;
        scope.sortType = '';
        scope.sortReverse = false;
        scope.$watchCollection('items', function(newItems, oldItems) {
          scope.categories = categoryFactory.createLabels(newItems);
        });
        scope.onComplete = function() {
          scope.addItem = false;
        };
        scope.toggleItemizer = function() {
          scope.addItem = !scope.addItem;
        };
      }
    };
    return directive;
  }
})();
