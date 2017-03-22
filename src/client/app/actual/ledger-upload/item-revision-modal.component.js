(function () {
  'use strict';

  angular
    .module('app.actual')
    .component('itemRevisionModal', {
      templateUrl: 'app/actual/ledger-upload/item-modal.html',
      controller: itemRevisionModalCtrl,
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      }
    });

  itemRevisionModalCtrl.$inject = ['ArticleFactory', 'Budget', '_'];

  function itemRevisionModalCtrl(ArticleFactory, Budget, _) {
    /* jshint validthis: true */
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.loadingTable = true;
      Budget.getCategoriesForYear($ctrl.resolve.items[0].date.getFullYear())
      .then(function (categories) {
        $ctrl.colSetup = buildColumns();
        _.find($ctrl.colSetup, ['prop', 'category']).options = categories;
      })
      .then(function () {
        $ctrl.items = $ctrl.resolve.items.map(function (item) {
          return Object.assign(item, {add: true});
        });
      })
      .finally(function () {
        $ctrl.loadingTable = false;
      })
    }

    function setSort(column, sortDesc) {
      ctrl.sortType = column;
      ctrl.sortDesc = sortDesc;
    }


    $ctrl.toggleRemove = function(item) {
        item.add = !item.add;
    }

    $ctrl.ok = function(validForm) {
      if (validForm)
      {
        console.log('test');
        var omitAddProp = _.partialRight(_.omit, ['add']);
        var itemsToUpload = _($ctrl.items)
                            .filter({'add': true})
                            .map(omitAddProp);
        $ctrl.close({$value: itemsToUpload.value()});
      }
    }

    $ctrl.ignore = function () {
      $ctrl.dismiss();
    }

    function buildColumns() {
      return ArticleFactory.getColumnConfig('actual');
    }
  }
})();
