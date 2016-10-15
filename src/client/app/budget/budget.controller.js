//TODO move logic into a service
(function () {
  'use strict';

  angular
    .module('app.budget')
    .controller('BudgetController', BudgetController);

  BudgetController.$inject = ['budget', 'budgetHelper', 'logger'];
  /* @ngInject */
  function BudgetController(budget, budgetHelper, logger) {
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
        if (!vm.availableOccurances.length) {
          vm.availableOccurances = budgetHelper.getOccurances(result);
        }
        var tables = budgetHelper.splitToIncomeAndExpense(result);
        vm.incomeTable = tables.incomes;
        vm.expenseTable = tables.expenses;
        vm.incomeTable.status.open = vm.incomeTable.lenth > 0;
        vm.expenseTable.status.open = vm.expenseTable.lenth > 0;
        itemsUpdated = true;
      });
    }
  }
})();
