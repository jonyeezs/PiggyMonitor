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
        categories: '<articleTrCategories',
        year: '<articleTrYear'
      },
      controller: 'articleTrController',
      controllerAs: 'vm',
      require: '^form',
      link: function(scope, element, attrs, formCtrl) {
        scope.vm.trForm = formCtrl;
      }
    };
    return directive;
  }
})();
