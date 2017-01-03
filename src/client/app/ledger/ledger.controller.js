(function () {

  angular
    .module('app.ledger')
    .controller('LedgerController', LedgerController);

  LedgerController.$inject = ['_', 'Ledger', 'logger'];
  /* @ngInject */
  function LedgerController(_, Ledger, logger) {
    var vm = this;
    vm.title = 'Ledger';

    vm.yearSelectionMsg = 'Select Ledger Year';
    vm.availableYears = [];
    vm.selectedYear = '';
    vm.selectYear = selectYear;
    vm.completedUpload = completedUpload;

    vm.items = [];

    activate();

    function activate() {
      updateYears();
    }

    function updateYears() {
      Ledger.getYears().then(function (results) {
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
      Ledger.getByYear(year).then(function (result) {
        vm.items = result;
      });
    }

    function completedUpload(uploadedYear) {
      selectYear(uploadedYear);
    };
  }
})();
