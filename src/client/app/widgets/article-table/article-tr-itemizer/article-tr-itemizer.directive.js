(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('articleTrItemizer', articleItemizer);

  articleItemizer.$inject = [];

  function articleItemizer() {
    var directive = {
      templateUrl: 'app/widgets/article-table/article-tr-itemizer/article-tr-itemizer.html',
      restrict: 'A',
      bindToController: {
        onCreate: '&itemizerOnCompleted'
      },
      controller: 'articleItemizerController',
      controllerAs: 'vm',
      require: {form: 'form', articleTable: '^^articleTable'},
      link: function(scope, element, attrs, apis) {
        scope.vm.newItemForm = apis.form;
        scope.vm.articleType = apis.articleTable.articleType;
        scope.vm.year = apis.articleTable.year;
        scope.vm.columnSetup = apis.articleTable.columnSetup;
      }
    };
    return directive;
  }
})();
