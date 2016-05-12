(function () {
    'use strict';

    angular
        .module('app.budget')
        .controller('BudgetController', BudgetController);

    BudgetController.$inject = ['_', 'budgetService', 'sidebarservice', 'summaryservice', 'logger'];
    /* @ngInject */
    function BudgetController(_, budgetService, sidebarservice, summaryservice, logger) {
        var vm = this;
        vm.title = 'Budget';
        vm.yearSelectionMsg = 'Select Budget Year';
        vm.selectedYear = vm.yearSelectionMsg;
        vm.selectYear = selectYear;
        vm.isBudgetUpdated = isBudgetUpdated;
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

        var itemsUpdated;

        activate();

        function activate() {
            logger.info('Activated Budget View');
            itemsUpdated = false;
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
            itemsUpdated = false;
            budgetService.getAll(year).then(function(result){
                vm.allItems = result;
                buildIncomeAndExpenseTables(result);
                itemsUpdated = true;
                summaryservice.publish(result);
            });
        }

        function isBudgetUpdated(){
            return itemsUpdated;
        }

        function buildIncomeAndExpenseTables(items){
            vm.incomeTable.items = _.filter(items, function(item) { return item.amount > 0;});
            vm.incomeTable.status.open = true;
            vm.expenseTable.items = _.filter(items, function(item) { return item.amount < 0;});
            vm.expenseTable.status.open = true;
        }
    }
})();
