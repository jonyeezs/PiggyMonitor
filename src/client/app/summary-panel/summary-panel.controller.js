(function () {
  'use strict';

  angular
      .module('app.summary')
      .controller('SummaryPanelController', SummaryPanelController);

  SummaryPanelController.$inject = ['_', 'budget', 'categoryFactory'];

  /* @ngInject */
  function SummaryPanelController(_, budget, categoryFactory) {
    var vm = this;
    vm.showGraph = false;
    vm.occurances = ['monthly', 'semiannual', 'annually'];
    vm.selectOccurance = selectOccurance;
    vm.occurance = 'monthly';

    activate();

    function activate() {
      beginSummaryProcess(vm.year);
    }

    function selectOccurance(occurance) {
      vm.occurance = occurance;
    }

    function beginSummaryProcess(year) {
      vm.showGraph = false;
      if (!year) {
        return;
      }
      budgetService.getByYearWithOccurance(year, vm.occurance).then(function (items) {
        populateExpensePieData(items);
        populateIncomeVsExpense(items);
      });
    }

    function populateExpensePieData(items) {
      var expensesBreakdown = categoryFactory.createForExpense(items);
      vm.labels = _.map(expensesBreakdown, 'label');
      vm.data = _.map(expensesBreakdown, 'percentage');
      vm.showGraph = true;
    }

    function populateIncomeVsExpense(items) {
      var income = categoryFactory.createForIncome(items);
      vm.positiveflow = _.sum(_.map(income, 'total'));
      var expense = categoryFactory.createForExpense(items);
      vm.negativeflow = _.sum(_.map(expense, 'total'));
      var difference = vm.positiveflow - vm.negativeflow;
      vm.difference = difference < 0 ? Math.abs(difference) : difference;
      vm.deficit = difference < 0;
    }
  }
})();
