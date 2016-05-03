(function() {
    'use strict';

    angular
        .module('app.summary')
        .controller('SummaryPanelController', SummaryPanelController);

    SummaryPanelController.$inject = ['_', '$scope', 'summaryservice'];

    /* @ngInject */
    function SummaryPanelController(_, $scope, summaryservice) {
        var vm = this;
        vm.showGraph = false;
        activate();

        function activate() {
            $scope.$on('summaryUpdated', getLabelData);
        }

        function getLabelData(){
            vm.showGraph = true;
            var data = summaryservice.getExpenses();
            vm.labels = _.map(data, 'label');
            vm.data = _.map(data, 'percentage');
            populateIncomeVsExpense();
        }
        function populateIncomeVsExpense(){
            var income = summaryservice.getIncome();
            vm.positiveflow = _.sum(_.map(income,'total'));
            var expense = summaryservice.getExpenses();
            vm.negativeflow = _.sum(_.map(expense,'total'));
            var difference = vm.positiveflow - vm.negativeflow;
            vm.difference = difference < 0 ? Math.abs(difference) : difference;
            vm.deficit = difference < 0;
        }
    }
})();
