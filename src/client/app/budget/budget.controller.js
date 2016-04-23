(function () {
    'use strict';

    angular
        .module('app.budget')
        .controller('BudgetController', BudgetController);

    BudgetController.$inject = ['$scope', 'logger'];
    /* @ngInject */
    function BudgetController($scope, logger) {
        var vm = this;
        vm.title = 'Budget';
        vm.yearSelectionMsg = 'Select Your Year';
        vm.selectedYear = vm.yearSelectionMsg;
        vm.availableYears = ['2016', '2015'];
        vm.selectYear = selectYear;
        activate();

        function activate() {
            logger.info('Activated Budget View');
        }

        function selectYear(year)
        {
            vm.selectedYear = year;
        }
    }
})();
