(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('articleItemizer', articleItemizer);

  articleItemizer.$inject = [];

  function articleItemizer() {
    var directive = {
      templateUrl: 'app/widgets/article-table/article-itemizer/article-itemizer.html',
      restrict: 'EA',
      bindToController: {
        year: '<itemizerYear',
        categories: '<itemizerCategories',
        onCreate: '&itemizerOnCompleted'
      },
      controller: 'articleItemizerController',
      controllerAs: 'vm',
      require: '^form',
      link: function(scope, element, attrs, formCtrl) {
        scope.vm.newItemForm = formCtrl;
      }
    };
    return directive;
  }
})();
