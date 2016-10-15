  angular
    .module('app.budget')
    .factory('budgetHelper', BudgetHelper);

BudgetHelper.$inject = ['_'];
/* @ngInject */
function BudgetHelper(_) {

  var service = {
    getOccurances: getOccurances,
    splitToIncomeAndExpense: splitToIncomeAndExpense
  };

  return service;

  function getOccurances(items) {
    var occurances = _(items)
      .map('occurance')
      .uniq()
      .map(function(occuranceType) { return { key: occuranceType, value: occuranceType };})
      .value();
    occurances.unshift({key: 'default occurance', value: undefined});
    return occurances;
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
