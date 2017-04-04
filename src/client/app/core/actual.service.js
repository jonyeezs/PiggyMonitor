//TODO: almost identical to budget! Maybe this should be refactored into a factory

(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('Actual', actualService);

  actualService.$inject = ['dataService', 'moment'];
  /* @ngInject */
  function actualService(dataService, moment) {

    var service = {
      getYears: getYears,
      getByYear: getByYear,
      update: function() {alert('coming soon!')},
      add: add
    };

    return service;

    function getYears() {
      return dataService.get('actuals/years').then(function (result) {
        var thisYear = new moment().year();
        return _.union(result.years, [thisYear]);
      });
    }

    function getByYear(year) {
      return dataService.get('actuals/years/' + year).then(function (result) {
        return result.items.map(function(item) {
          item.date = new Date(item.date);
          return item;
        });
      });
    }

    function add(year, item) {
      return dataService.post('actuals/years/' + year, item);
    }
  }
})();
