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

  itemRevisionModalCtrl.$inject = ['Budget', '_'];

  function itemRevisionModalCtrl(Budget, _) {
    /* jshint validthis: true */
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.items = $ctrl.resolve.items.map(function (item) {
        return Object.assign(item, {add: true});
      });

      $ctrl.categoryLoading = true;
      Budget.getCategoriesForYear($ctrl.items[0].date.getFullYear())
      .then(function (categories) {
        $ctrl.categories = categories;
      })
      .finally(function () {
        $ctrl.categoryLoading = false;
      })
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
  }
})();
