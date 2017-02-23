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
            this._multiSelected = false;
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
      if (selectionAvailable && selectedItem._multiSelected) {
        ctrl.items.filter(function(item) {return item._multiSelected})
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

    function save(isItemFormValid, selectedItem) {
      if(isItemFormValid && typeof ctrl.onItemUpdated == 'function') {
        updateState(selectedItem, true, 'editting');
        ctrl.onItemUpdated({event: 'updated', item: selectedItem.data})
        .then(function () {
          updateState(selectedItem, true, 'commit');
        })
        .catch(function () {
          updateState(selectedItem, false, 'commit');
        })
        .finally(function () {
          updateState(selectedItem, false, 'inProgress', 'editting');
        });
      }
    }

    function updateState(selectedItem, value) {
      var stateProps = Array.from(arguments).slice(2, arguments.length);

      if (selectionAvailable && selectedItem._multiSelected) {
        ctrl.items.filter(function (item) { return item._multiSelected })
          .forEach(function (item) {
            stateProps.forEach(function (stateProp) {
              item._editState[stateProp] = value;
            });
          });
      } else {
        stateProps.forEach(function (stateProp) {
          selectedItem._editState[stateProp] = value;
        });
      }
    }

    function cancel(selectedItem) {
      if (selectionAvailable && selectedItem._multiSelected) {
        ctrl.items.filter(function (item) { return item._multiSelected })
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
      if(!selectionAvailable && !item._editState.inProgress) {
        item._multiSelected = !item._multiSelected;
      }
    }

    function onTouchEnd(item) {
      selectionAvailable = ctrl.items.some(function(item) {return item._multiSelected;});
    }

    function onShortPress(item) {
      if (selectionAvailable && !item._editState.inProgress) {
        item._multiSelected = !item._multiSelected;
      }
    }
  }
})();
