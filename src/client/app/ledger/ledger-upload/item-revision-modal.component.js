(function () {
  'use strict';

  angular
    .module('app.ledger')
    .component('itemRevisionModal', {
      templateUrl: 'app/ledger/ledger-upload/item-modal.html',
      controller: itemRevisionModal,
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      }
    });

  itemRevisionModal.$inject = ['Budget'];

  function itemRevisionModal(Budget) {
    /* jshint validthis: true */
    var $ctrl = this;
    $ctrl.$onInit = function () {
      $ctrl.items = angular.copy($ctrl.resolve.items);
      Budget.getCategoriesForYear($ctrl.items[0].date.getFullYear()).then(function (categories) {
        $ctrl.categories = categories;
      })
    }

    $ctrl.ok = function(validForm) {
      if (validForm)
      {
        $ctrl.close({$value: items});
      }
    }

    $ctrl.ignore = function () {
      $ctrl.dismiss();
    }
  }
})();
