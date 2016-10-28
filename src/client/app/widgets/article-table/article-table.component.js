(function () {
  'use strict';

  angular
    .module('app.widgets')
    .component('articleTable', {
      templateUrl: 'app/widgets/article-table/article-table.html',
      controller: articleTableCtrl,
      bindings: {
        articleType: '@',
        items: '<',
        year: '<'
      }
    });

  articleTableCtrl.$inject = ['categoryFactory'];

  function articleTableCtrl(categoryFactory) {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.addItem = false;
      ctrl.sortType = '';
      ctrl.sortDesc = false;

      ctrl.onComplete = function() {
        ctrl.addItem = false;
      };

      ctrl.toggleSort = function(header) {
          ctrl.sortType = header;
          ctrl.sortDesc = !ctrl.sortDesc;
      }

      ctrl.isToggled = function(header) {
        return ctrl.sortType === header;
      }

      ctrl.toggleItemizer = function() {
        ctrl.addItem = !ctrl.addItem;
      };

      ctrl.columnSetup = setupColumn(ctrl.articleType);
    };

    ctrl.$onChanges = function(changes) {
      if (changes.items)
      {
        ctrl.categories = categoryFactory.createLabels(changes.items.currentValue);
      }
    };

    /**
     * creates the header and the columns
     * @method setupColumn
     * @param  {string}    type - ledger or budget
     * @return {[columnSetup]}         collection of columns in left-first order
     * @typedef {Object}  columnSetup
     * @property {string} header - column's display name
     * @property {string} prop - the property on the item object
     * @property {string} class - column's css style
     * NOTE: The collection needs to be updated whenever the payload properties changes
     */
    function setupColumn(type) {
      if (type === 'ledger') {
        //TODO for ledger
      }
      else {
        return [
          { name: 'Item',      prop: 'description', class: 'col-md-5 text-left' },
          { name: 'Category',  prop: 'category',    class: 'col-md-2 text-left' },
          { name: 'Frequency', prop: 'occurance',   class: 'col-md-2 text-center' },
          { name: 'Amount',    prop: 'amount',      class: 'col-md-1 text-right' }
        ];
      }
    }
  }
})();
