//TODO move logic into a service
(function () {
  'use strict';

  angular
    .module('app.budget')
    .controller('BudgetController', BudgetController);

  BudgetController.$inject = ['_', 'budget', 'logger'];
  /* @ngInject */
  function BudgetController(_, budget, logger) {
    var itemsUpdated;
    var vm = this;
    vm.title = 'Budget';

    vm.yearSelectionMsg = 'Select Budget Year';
    vm.selectedYear = '';
    vm.selectYear = selectYear;

    vm.occuranceSelectionMsg = 'Select Occurance';
    vm.selectedOccurance = '';
    vm.availableOccurances = [];
    vm.selectOccurance = selectOccurance;

    /* table Status */
    vm.incomeTable = {
      items: [],
      status: {
        open: false
      }
    };
    vm.expenseTable = {
      items: [],
      status: {
        open: false
      }
    };
    vm.allItems = [];

    activate();

    function activate() {
      logger.info('Activated Budget View');
      itemsUpdated = false;
      updateYears();
    }

    function updateYears() {
      budget.getYears().then(function (result) {
        vm.availableYears = result;
      });
    }

    function selectYear(year) {
      vm.selectedYear = year;
      updateItems(year);
    }

    function selectOccurance(occurance) {
      vm.selectedOccurance = occurance;
      updateItems(vm.selectedYear, occurance);
    }

    function updateItems(year, occurance) {
      itemsUpdated = false;
      var getItems;
      if (occurance) {
        getItems = budget.getByYearWithOccurance(year, occurance);
      }
      else {
        getItems = budget.getByYear(year);
      }
      getItems.then(function (result) {
        vm.allItems = result;
        if (!vm.availableOccurances.length) {
          updateOccurances(result);
        }
        buildIncomeAndExpenseTables(result);
        itemsUpdated = true;
      });
    }

    function buildIncomeAndExpenseTables(items) {
      vm.incomeTable.items = _.filter(items, function (item) {
        return item.amount > 0;
      });
      vm.incomeTable.status.open = true;
      vm.expenseTable.items = _.filter(items, function (item) {
        return item.amount < 0;
      });
      vm.expenseTable.status.open = true;
    }

    function updateOccurances(items) {
      vm.availableOccurances = _(items)
        .map('occurance')
        .uniq()
        .map(function(occuranceType) { return {key: occuranceType, value: occuranceType};})
        .value();
        vm.availableOccurances.unshift({key: 'default', value: undefined});
    }
  }
})();
