(function () {
    'use strict';

    angular
        .module('app.budget')
        .controller('BudgetController', BudgetController);

    BudgetController.$inject = ['_', 'sidebarservice', 'budgetService', 'logger'];
    /* @ngInject */
    function BudgetController(_, sidebarservice, budgetService, logger) {
        var vm = this;
        vm.title = 'Budget';
        vm.yearSelectionMsg = 'Select Budget Year';
        vm.selectedYear = vm.yearSelectionMsg;
        vm.selectYear = selectYear;

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
            sidebarservice.setView(sidebarservice.views.Budget);
            updateYears();
        }

        function updateYears(){
            budgetService.getYears().then(function(result){
                vm.availableYears = result;
            });
        }

        function selectYear(year)
        {
            vm.selectedYear = year;
            updateItems(year);
        }

        function updateItems(year){
            budgetService.getAll(year).then(function(result){
                buildIncomeAndExpenseTables(result);
            });
        }

        function buildIncomeAndExpenseTables(items){
            vm.incomeTable.items = _.filter(items, function(item) { return item.amount > 0;});
            vm.incomeTable.status.open = true;
            vm.expenseTable.items = _.filter(items, function(item) { return item.amount < 0;});
            vm.expenseTable.status.open = true;
        }
    }
})();
