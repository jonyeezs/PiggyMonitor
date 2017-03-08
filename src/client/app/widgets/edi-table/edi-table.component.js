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

      ctrl.itemUpdated = itemUpdated;
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

    function itemUpdated(items) {
      return ctrl.onItemUpdated({ event: 'updated', items: items});
    }

    function updateState(selectedItem, value) {
      var stateProps = Array.from(arguments).slice(2, arguments.length);

      return getSelectedItems(selectedItem).forEach(function (item) {
        stateProps.forEach(function (stateProp) {
          item._editState[stateProp] = value;
        })
      });
    }

    function getSelectedItems(selectedItem) {
      var updatedItems;
      if (selectionAvailable && selectedItem._multiSelected) {
        updatedItems = ctrl.items.filter(function (item) { return item._multiSelected });
      } else {
        updatedItems = [selectedItem];
      }
      return updatedItems;
    }

    function onLongPress(item) {
      // if(!selectionAvailable && !item._editState.inProgress) {
      //   item._multiSelected = !item._multiSelected;
      // }
    }

    function onTouchEnd(item) {
      // selectionAvailable = ctrl.items.some(function(item) {return item._multiSelected;});
    }

    function onShortPress(item) {
      // if (selectionAvailable && !item._editState.inProgress) {
      //   item._multiSelected = !item._multiSelected;
      // }
    }
  }
})();
