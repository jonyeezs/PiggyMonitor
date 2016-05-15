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
            createForExpense: createForExpense,
            createForIncome: createForIncome
        };

        return service;

        function createLabels(items){
            return _(items).map('category').uniq().value();
        }

        function createForExpense(items) {
            return categorizeItems(items, filterByExpense);
        }

        function createForIncome(items) {
            return categorizeItems(items, filterByIncome);
        }

        function categorizeItems(items, byFilteryType){
            var categoryDetails = [];
            var total = getTotal(items, byFilteryType);
            //TODO you can refactor this better. Maybe use something like reduce;
            var groupedCategories = _(items).filter(byFilteryType).groupBy('category').value();

            _.forOwn(groupedCategories, function(value, key){
                var categoryTotal = Math.abs(_(value).map('amount').sum());
                categoryDetails.push(mapLabelData(key, categoryTotal, calculatePercentage(categoryTotal, total)));
            });
            return categoryDetails;
        }

        function mapLabelData(key, total, totalPercentage){
            return {
                label: key,
                total: total,
                percentage: totalPercentage
            };
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
    }
})();
