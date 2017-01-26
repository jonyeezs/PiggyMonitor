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

  ediTableCtrl.$inject = ['_', 'ArticleFactory'];

  function ediTableCtrl(_, ArticleFactory) {
    /* jshint validthis: true */
    var ctrl = this;
    var selectionAvailable = false;

    ctrl.$onInit = function () {
      ctrl.sortType = '';
      ctrl.sortDesc = false;
      ctrl.setSort = setSort;

      ctrl.itemAdded = itemAdded;

      ctrl.onLongPress = onLongPress;
      ctrl.onTouchEnd = onTouchEnd;
      ctrl.onShortPress = onShortPress;

      ctrl.edit = edit;
      ctrl.save = save;
      ctrl.cancel = cancel;
    }

    ctrl.$onChanges = function(changes) {
      if (changes.items && changes.items.currentValue)
      {
        ctrl.items = angular.copy(changes.items.currentValue)
                            .map(selectAndEditState);

        function selectAndEditState(item) {
          function State() {
            this._selected = false;
            this._editState = {
              inProgress: false,
              editting: false,
              commit: false
            }
          };
          return _.assignIn({}, new State(), {data: item});
        }
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

    function edit(selectedItem) {
      if (selectionAvailable && selectedItem._selected) {
        ctrl.items.filter(function(item) {return item._selected})
                  .forEach(function (item) {
                    item._editState.inProgress = true;
                    item._editState.editting = false;
                    item._editState.commit = false;
                  });
      }
      else {
        selectedItem._editState.inProgress = true;
        selectedItem._editState.editting = false;
        selectedItem._editState.commit = false;
      }
    }

    function save(isItemFormValid, item) {
      if(isItemFormValid && typeof ctrl.onItemUpdated == 'function') {
        item._editState.editting = true;
        ctrl.onItemUpdated({event: 'updated', item: item.data})
        .then(function () {
          item._editState.commit = true;
        })
        .catch(function () {
          item._editState.commit = false;
        })
        .finally(function () {
          item._editState.inProgress = false;
          item._editState.editting = false;
        });
      }
    }

    function cancel(selectedItem) {
      if (selectionAvailable && selectedItem._selected) {
        ctrl.items.filter(function (item) { return item._selected })
          .forEach(function (item) {
            item._editState.inProgress = false;
            item._editState.editting = false;
            item._editState.commit = false;
          });
      } else {
        selectedItem._editState = {
          inProgress: false,
          editting: false,
          commit: false
        };
      }
    }

    function onLongPress(item) {
      item._selected = !item._selected;
    }

    function onTouchEnd(item) {
      selectionAvailable = ctrl.items.some(function(item) {return item._selected;});
    }

    function onShortPress(item) {
      if (selectionAvailable) {
        item._selected = !item._selected;
      }
    }
  }
})();
