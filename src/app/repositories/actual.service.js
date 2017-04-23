module.exports = angular.module('repo.actual', [
  require('./backend-connector.service')
])
.factory('actual', actualService)
.name;

actualService.$inject = ['data', 'moment'];
function actualService(data, moment) {

  var service = {
    getYears: getYears,
    getByYear: getByYear,
    update: function() {alert('coming soon!')},
    add: add
  };

  return service;

  function getYears() {
    return data.get('actuals/years').then(function (result) {
      var thisYear = new moment().year();
      return _.union(result.years, [thisYear]);
    });
  }

  function getByYear(year) {
    return data.get('actuals/years/' + year).then(function (result) {
      return result.items.map(function(item) {
        item.date = new Date(item.date);
        return item;
      });
    });
  }

  function add(year, item) {
    return data.post('actuals/years/' + year, item);
  }
}
