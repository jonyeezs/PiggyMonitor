(function () {
  'use strict';

  angular
    .module('app.edi-table')
    .component('ediTable', {
      templateUrl: 'app/widgets/edi-table/edi-table.html',
      controller: ediTableCtrl,
      bindings: {
        colSetup: '<',
        items: '<',
        settings: '<',
        onItemCreated: '&?',
        onItemUpdated: '&?'
      }
    });

  ediTableCtrl.$inject = ['ArticleFactory'];

  function ediTableCtrl(ArticleFactory) {
    /* jshint validthis: true */
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.sortType = '';
      ctrl.sortDesc = false;
      ctrl.setSort = setSort;

      ctrl.itemAdded = itemAdded;

      ctrl.editState = {
        inProgress: false,
        commit: false
      };
      ctrl.editting = false;
      ctrl.edit = edit;
      ctrl.save = save;
      ctrl.cancel = cancel;
    }

    ctrl.$onChanges = function(changes) {
      if (changes.items && changes.items.currentValue)
      {
        ctrl.items = angular.copy(changes.items.currentValue);
      }
    };

    function setSort(column, sortDesc) {
      ctrl.sortType = column;
      ctrl.sortDesc = sortDesc;
    }

    function itemAdded(newItem) {
      if (ctrl.settings.creatable && ctrl.onItemCreated)
      {
        return ctrl.onItemCreated({item: newItem});
      }
    };

    function edit() {
      ctrl.editState.inProgress = true;
      ctrl.editState.commit = false;
    }

    function save(isItemFormValid, item) {
      if(isItemFormValid && onItemUpdated) {
        ctrl.editting = true;
        onItemUpdated({event: 'updated', item: item})
        .then(function () {
          ctrl.editState.commit = true;
        })
        .catch(function () {
          ctrl.editState.commit = false;
        })
        .finally(function () {
          ctrl.editting = false;
          ctrl.editState.inProgress = false;
        });
      }
    }

    function cancel() {
      ctrl.editting = false;
      ctrl.editState = {
        inProgress: false,
        commit: false
      };
    }
  }
})();
