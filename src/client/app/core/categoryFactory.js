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

    /**
    * Creates a distinct list of categories from the items.
    * @param {{category: string}[]} items - list of item objects with minimum property category
    * @returns {string|Array} category names
    */
    function createLabels(items) {
      return _(items).map('category').uniq().value();
    }

    /**
    * Creates a distinct list of categories from the items that are debit (ie: amounts lower than zero);
    * @param {{category: string, amount: number}[]} items - list of objects with minimum property category and amount.
    * @returns {{label: string, total: !number, percentage: !number}[]} labels with its category amount info.
    */
    function createForExpense(items) {
      return categorizeItems(items, filterByExpense);
    }

    /**
    * Creates a distinct list of categories from the items that are credit (ie: amounts more than zero);
    * @param {{category: string, amount: number}[]} items - list of objects with minimum property category and amount.
    * @returns {{label: string, total: !number, percentage: !number}[]} labels with its category amount info.
    */
    function createForIncome(items) {
      return categorizeItems(items, filterByIncome);
    }

    function categorizeItems(items, byFilteryType) {
      var categoryDetails = [];
      var total = getTotal(items, byFilteryType);
      //TODO you can refactor this better. Maybe use something like reduce;
      var groupedCategories = _(items).filter(byFilteryType).groupBy('category').value();

      _.forOwn(groupedCategories, function (value, key) {
        var categoryTotal = Math.abs(_(value).map('amount').sum());
        categoryDetails.push(mapToLabelData(key, categoryTotal, total));
      });
      return categoryDetails;
    }

    function mapToLabelData(key, categoryTotal, total) {
      return {
        label: key,
        total: categoryTotal,
        percentage: calculatePercentage(categoryTotal, total)
      };
    }

    function getTotal(items, byFilteryType) {
      var expenseItems = _.filter(items, byFilteryType);
      return _.sumBy(expenseItems, function (item) {
        return Math.abs(item.amount);
      });
    }

    function calculatePercentage(category, total) {
      var result = _.round(category / total * 100);
      return result;
    }

    function filterByExpense(item) {
      return item.amount < 0;
    }

    function filterByIncome(item) {
      return item.amount > 0;
    }
  }
})();
