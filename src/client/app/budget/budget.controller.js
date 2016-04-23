(function () {
    'use strict';

    angular
        .module('app.budget')
        .controller('BudgetController', BudgetController);

    BudgetController.$inject = ['logger'];
    /* @ngInject */
    function BudgetController(logger) {
        var vm = this;
        vm.title = 'Budget';

        activate();

        function activate() {
            logger.info('Activated Budget View');
        }
    }
})();
