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
      require: {form: 'form', articleTable: '^^articleTable'},
      link: function(scope, element, attrs, apis) {
        scope.vm.trForm = apis.form;
        scope.vm.articleType = apis.articleTable.articleType;
        scope.vm.year = apis.articleTable.year;
        scope.vm.columnSetup = apis.articleTable.columnSetup;
      }
    };
    return directive;
  }
})();
