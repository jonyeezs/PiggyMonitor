(function () {

  angular
    .module('app.budget')
    .controller('BudgetController', BudgetController);

  BudgetController.$inject = ['_', 'Budget', 'budgetHelper', 'logger'];
  /* @ngInject */
  function BudgetController(_, Budget, budgetHelper, logger) {
    var vm = this;
    vm.title = 'Budget';

    vm.yearSelectionMsg = 'Select Budget Year';
    vm.availableYears = [];
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
      },
      colSetup: budgetHelper.getEdiTableColSetup(),
      tableSettings: {}
    };
    vm.expenseTable = {
      items: [],
      status: {
        open: false
      },
      colSetup: budgetHelper.getEdiTableColSetup(),
      tableSettings: {}
    };

    vm.expenseCreated = itemCreated(vm.expenseTable);
    vm.incomeCreated = itemCreated(vm.incomeTable);
    vm.expenseUpdated = itemUpdated(vm.expenseTable);
    vm.incomeUpdated = itemUpdated(vm.incomeTable);

    activate();

    function activate() {
      logger.info('Activated Budget View');
      updateYears();
    }

    function updateYears() {
      Budget.getYears().then(function (results) {
        vm.availableYears = _.map(results, function (result) {
          return {
            key: result,
            value: result
          };
        });
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
      var getItems;
      if (occurance) {
        getItems = Budget.getByYearWithOccurance(year, occurance);
      }
      else {
        getItems = Budget.getByYear(year);
      }

      vm.itemsLoading = true;

      getItems.then(function (result) {
        if (!vm.availableOccurances.length) {
          vm.availableOccurances = budgetHelper.getOccurances(result);
        }
        var tables = budgetHelper.splitToIncomeAndExpense(result);

        vm.incomeTable.colSetup = vm.expenseTable.colSetup = budgetHelper.getEdiTableColSetup(result);

        vm.incomeTable.tableSettings = vm.expenseTable.tableSettings =
        {
          editable: true,
          creatable: true,
          deletable: true,
          multable: true
        };

        vm.incomeTable.items = tables.incomes;
        vm.expenseTable.items = tables.expenses;

        vm.incomeTable.status.open = vm.incomeTable.items.length > 0;
        vm.expenseTable.status.open = vm.expenseTable.items.length > 0;
      })
      .finally(function () {
        vm.itemsLoading = false;
      });
    }

    function itemCreated(table) {
      return function (item) {
        return Budget.add(vm.selectedYear, item)
          .then(function (id) {
            item.id = id;
            table.items.unshift(item);
          });
      };
    }

    function itemUpdated(table) {
      return function (item) {
        return Budget.update(vm.selectedYear, item)
        .then(function(updatedItem) {
          var index = table.items.findIndex(function (item) { return item.id === updatedItem.id; });
          if (index != -1) {
            table.items[index] = updatedItem;
          }
        });
      };
    }
  }
})();
