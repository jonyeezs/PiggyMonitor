  angular
    .module('app.budget')
    .factory('budgetHelper', BudgetHelper);

BudgetHelper.$inject = ['_', 'ArticleFactory'];
/* @ngInject */
function BudgetHelper(_, ArticleFactory) {

  var service = {
    getOccurances: getOccurances,
    getEdiTableColSetup : getEdiTableColSetup,
    splitToIncomeAndExpense: splitToIncomeAndExpense
  };

  return service;

  function getOccurances(items) {
    var occurances = _(items)
      .map('occurance')
      .uniq()
      .map(function(occuranceType) { return { key: occuranceType, value: occuranceType };})
      .value();
    occurances.unshift({key: 'default occurance', value: null});
    return occurances;
  }

  function getEdiTableColSetup(items) {
    return ArticleFactory.getColumnConfig('budget', items);
  }

  function splitToIncomeAndExpense(items) {
    return {
      incomes: _.filter(items, function (item) {
        return item.amount > 0;
      }),
      expenses: _.filter(items, function (item) {
        return item.amount < 0;
      })
    };
  }
}
