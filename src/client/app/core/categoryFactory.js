(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('categoryFactory', categoryFactory);

    categoryFactory.$inject = ['_'];
    /* @ngInject */
    function categoryFactory(_) {

        var service = {
            createLabels: createLabels,
            createExpense: createExpenses,
            createIncome: createIncome
        };

        return service;

        function createLabels(items){
            return _(items).map('category').uniq().value();
        }

        function createExpenses(items) {
            var categoryDetails = [];
            var total = getTotal(items, filterByExpense);
            var groupedCategories = categorizeItems(items, filterByExpense);

            _.forOwn(groupedCategories, function(value, key){
                var categoryTotal = Math.abs(_(value).map('amount').sum());
                categoryDetails.push(mapLabelData(key, categoryTotal, calculatePercentage(categoryTotal, total)));
            });
            return categoryDetails;
        }

        function createIncome(items) {
            var categoryDetails = [];
            var total = getTotal(items, filterByIncome);
            var groupedCategories = categorizeItems(items, filterByIncome);

            _.forOwn(groupedCategories, function(value, key){
                var categoryTotal = Math.abs(_(value).map('amount').sum());
                categoryDetails.push(mapLabelData(key, categoryTotal, calculatePercentage(categoryTotal, total)));
            });
            return categoryDetails;
        }

        function categorizeItems(items, byFilteryType){
            return _(items).filter(byFilteryType).groupBy('category').value();
        }

        function getTotal(items, byFilteryType){
            var expenseItems = _.filter(items, byFilteryType);
            return _.sumBy(expenseItems, function(item) { return Math.abs(item.amount); });
        }

        function calculatePercentage(category, total){
            var result = _.round(category/total*100);
            return result;
        }

        function filterByExpense(item){
            return item.amount < 0;
        }

        function filterByIncome(item){
            return item.amount > 0;
        }

        function mapLabelData(key, total, totalPercentage){
            return {
                label: key,
                total: total,
                percentage: totalPercentage
            };
        }
    }
})();
