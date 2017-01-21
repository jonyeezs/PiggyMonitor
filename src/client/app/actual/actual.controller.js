(function () {

  angular
    .module('app.actual')
    .controller('ActualController', ActualController);

  ActualController.$inject = ['_', 'Actual', 'ArticleFactory', 'logger'];
  /* @ngInject */
  function ActualController(_, Actual, ArticleFactory, logger) {
    var vm = this;
    vm.title = 'Actual';

    vm.yearSelectionMsg = 'Select Actual Year';
    vm.availableYears = [];
    vm.selectedYear = '';
    vm.selectYear = selectYear;
    vm.completedUpload = completedUpload;

    vm.items = [];
    vm.tableSettings = {
      editable: true,
      creatable: true
    };

    activate();

    function activate() {
      updateYears();
    }

    function updateYears() {
      Actual.getYears().then(function (results) {
        vm.availableYears = _.map(results, function (result) {
          return {
            key: result,
            value: result
          };
        });
      });
    }

    function selectYear(year) {
      vm.selectedYear = year;
      updateItems(year);
    }

    function updateItems(year) {
      Actual.getByYear(year).then(function (result) {
        vm.items = angular.copy(result);
        vm.colSetup = ArticleFactory.getColumnConfig('actual', result);
      });
    }

    function completedUpload(uploadedYear) {
      selectYear(uploadedYear);
    };
  }
})();
