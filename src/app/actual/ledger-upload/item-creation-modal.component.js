module.exports = angular
    .module('actual.ledger-upload')
    .component('itemCreationModal', {
      template: require('./item-modal.html'),
      controller: itemCreationModalCtrl,
      bindings: {
        resolve: '<',
        close: '&',
        dismiss: '&'
      }
    });

itemCreationModalCtrl.$inject = ['articleFactory', 'ledgerUpload', 'ediTrMultiSelection', '_', '$q'];
function itemCreationModalCtrl(articleFactory, ledgerUpload, ediTrMultiSelection, _, $q) {
  /* jshint validthis: true */
  var $ctrl = this;

  var removedItems = [];

  $ctrl.$onInit = function () {
    $ctrl.loadingTable = true;
    $ctrl.fileName = $ctrl.resolve.fileName;
    $ctrl.initEditState = {
      inProgress: true,
      forceEdit: true,
      deletable: true
    };

    $ctrl.colSetup = buildColumns();
    _.find($ctrl.colSetup, ['prop', 'category']).options = $ctrl.resolve.categories;

    $ctrl.items = $ctrl.resolve.items.map(function (item, index) {
      return Object.assign(item, {id: index});
    });
  }

  $ctrl.onAllSelectionChange = function() {
    ediTrMultiSelection.setAllItemSelection('ledger-upload', $ctrl.isToSelectAll);
    //Because the selection class is hidden in a directive, we'll have to do our own hack
    var trs = document.getElementById('ledger-upload').getElementsByTagName('TBODY')[0].getElementsByTagName('TR');
    Array.prototype.forEach.call(trs, (item) => {
      if ($ctrl.isToSelectAll) {
        item.classList.add('selected-row');
      }
      else {
        item.classList.remove('selected-row');
      }
    });
  }

  $ctrl.setSort = function(column, sortDesc) {
    $ctrl.sortType = column;
    $ctrl.sortDesc = sortDesc;
  }

  $ctrl.saveEntries = function(items) {
    return ledgerUpload.createEntries(items)
    .then(function (results) {
      if(removeItems(items) === 0) {
        $ctrl.close({success: true});
      }
    });
  }

  $ctrl.removeEntries = function(items) {
    return $q.resolve(removeItems(items))
      .then(function(itemsLeft) {
        if(itemsLeft === 0) {
          $ctrl.close({success: true});
        }
      });
  }

  $ctrl.ignore = function () {
    $ctrl.dismiss();
  }

  /**
   * removes items from the main collection and informs remaining size
   * @method removeItems
   * @param  {[Object]}    items items with a unique id on property id
   * @return Number            length of remaining items
   */
  function removeItems(items) {
    _.pullAllBy($ctrl.items, items, 'id');
    return $ctrl.items.length;
  }

  function buildColumns() {
    return articleFactory.getColumnConfig('actual');
  }
}
