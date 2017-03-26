(function () {
  'use strict';

  angular
    .module('app.actual')
    .component('itemCreationModal', {
      templateUrl: 'app/actual/ledger-upload/item-modal.html',
      controller: itemCreationModalCtrl,
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      }
    });

  itemCreationModalCtrl.$inject = ['ArticleFactory', 'LedgerUpload', '_'];

  function itemCreationModalCtrl(ArticleFactory, LedgerUpload, _) {
    /* jshint validthis: true */
    var $ctrl = this;

    var removedItems = [];

    $ctrl.$onInit = function () {
      $ctrl.loadingTable = true;

      $ctrl.colSetup = buildColumns();
      _.find($ctrl.colSetup, ['prop', 'category']).options = $ctrl.resolve.categories;

      $ctrl.items = $ctrl.resolve.items.map(function (item, index) {
        return Object.assign(item, {id: index});
      });

      $ctrl.loadingTable = false;
    }

    function setSort(column, sortDesc) {
      ctrl.sortType = column;
      ctrl.sortDesc = sortDesc;
    }


    $ctrl.toggleRemove = function(item) {
        item.add = !item.add;
    }

    $ctrl.createEntries = function(items, validForm) {
      if (validForm) {
        return LedgerUpload.createEntries(items)
        .then(function (results) {
          if(removeItems(items)) {
            $ctrl.close(success);
          }
        })
      }
    }

    $ctrl.ignore = function () {
      $ctrl.dismiss();
    }

    function removeItems(items) {
      _.remove(array, function(n) {
          return n % 2 == 0;
        });
    }

    function buildColumns() {
      return ArticleFactory.getColumnConfig('actual');
    }
  }
})();
