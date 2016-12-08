(function () {
  'use strict';

  angular
      .module('app.widgets')
      .directive('articleTr', articleTr);

  function articleTr() {
    var directive = {
      templateUrl: 'app/widgets/article-table/article-tr/article-tr.html',
      restrict: 'A',
      bindToController: {
        item: '=articleTrData',
      },
      controller: 'articleTrController',
      controllerAs: 'vm',
      require: {articleTable: '^^articleTable'},
      link: function(scope, element, attrs, apis) {
        scope.vm.articleType = apis.articleTable.articleType;
        scope.vm.disableRemoveNeg = apis.articleTable.articleType === 'ledger';
        scope.vm.year = apis.articleTable.year;
        scope.vm.columnSetup = apis.articleTable.columnSetup;
      }
    };
    return directive;
  }
})();
