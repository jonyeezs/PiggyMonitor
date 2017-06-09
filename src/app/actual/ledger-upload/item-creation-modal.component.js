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

itemCreationModalCtrl.$inject = ['articleFactory', 'ledgerUpload', '_'];
function itemCreationModalCtrl(articleFactory, ledgerUpload, _) {
  /* jshint validthis: true */
  var $ctrl = this;

  var removedItems = [];

  $ctrl.$onInit = function () {
    $ctrl.loadingTable = true;

    $ctrl.initEditState = {
      inProgress: true,
      forceEdit: true
    };

    $ctrl.colSetup = buildColumns();
    _.find($ctrl.colSetup, ['prop', 'category']).options = $ctrl.resolve.categories;

    $ctrl.items = $ctrl.resolve.items.map(function (item, index) {
      return Object.assign(item, {id: index});
    });
  }

  function setSort(column, sortDesc) {
    $ctrl.sortType = column;
    $ctrl.sortDesc = sortDesc;
  }

  $ctrl.saveEntries = function(items) {
    return ledgerUpload.createEntries(items)
    .then(function (results) {
      if(removeItems(items) === 0) {
        $ctrl.close(true);
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
