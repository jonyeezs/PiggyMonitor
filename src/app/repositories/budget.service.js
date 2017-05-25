module.exports = angular.module('repo.budget', [
    require('./backend-connector.service')
  ])
  .factory('budget', budgetService)
  .name;

budgetService.$inject = ['data'];
function budgetService(data) {

  const basePath = 'budgets';
  var service = {
    getYears: getYears,
    getByYear: getByYear,
    getByYearWithOccurance: getByYearWithOccurance,
    update: update,
    add: add
  };

  return service;

  function getYears() {
    return data.get(basePath + '/years')
      .then(function (result) {
        return result.years;
      });
  }

  function getByYear(year) {
    return data.get(basePath + '/years/' + year)
      .then(function (result) {
        return result.items;
      });
  }

  function getByYearWithOccurance(year, occuranceType) {
    return data.get(basePath + '/years/' + year, {
        occurance: occuranceType
      })
      .then(function (result) {
        return result.items;
      });
  }

  function update(year, item) {
    return data.patch(basePath + '/years/' + year, [item]);
  }

  function add(year, item) {
    return data.post(basePath + '/years/' + year, item);
  }
}
