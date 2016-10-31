(function () {
  'use strict';

  angular
    .module('app.widgets')
    .component('articleTable', {
      templateUrl: 'app/widgets/article-table/article-table.html',
      controller: articleTableCtrl,
      bindings: {
        articleType: '@',
        items: '<',
        year: '<'
      }
    });

  articleTableCtrl.$inject = ['ArticleSetup'];

  function articleTableCtrl(ArticleSetup) {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.addItem = false;
      ctrl.sortType = '';
      ctrl.sortDesc = false;

      ctrl.onComplete = function() {
        ctrl.addItem = false;
      };

      ctrl.toggleSort = function(header) {
          ctrl.sortType = header;
          ctrl.sortDesc = !ctrl.sortDesc;
      }

      ctrl.isToggled = function(header) {
        return ctrl.sortType === header;
      }

      ctrl.toggleItemizer = function() {
        ctrl.addItem = !ctrl.addItem;
      };

      ctrl.columnSetup = ArticleSetup.getColumnConfig(ctrl.articleType);
    };

    ctrl.$onChanges = function(changes) {
      if (changes.items)
      {
        ArticleSetup.setCategories(changes.items.currentValue);
      }
    };
  }
})();
