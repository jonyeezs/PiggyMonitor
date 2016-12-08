(function () {

  angular
    .module('app.ledger')
    .controller('LedgerController', LedgerController);

  LedgerController.$inject = ['_', 'Ledger', 'logger', 'Upload', '$q', 'moment'];
  /* @ngInject */
  function LedgerController(_, Ledger, logger, Upload, $q, Moment) {
    var vm = this;
    vm.title = 'Ledger';

    vm.yearSelectionMsg = 'Select Ledger Year';
    vm.availableYears = [];
    vm.selectedYear = '';
    vm.selectYear = selectYear;
    vm.upload = upload;

    vm.items = [];

    activate();

    function activate() {
      updateYears();
    }

    function upload(file) {
      if (file) {
        var reader = new FileReader();
        reader.onload = loadCompletedFile;
        reader.readAsText(file);
      }
    }

    function loadCompletedFile(event) {
      var csv = event.target.result;
      var rows = CSV.parse(csv).map(function (row) {
        return {
          date: row[0],
          amount: row[1],
          description: row[2]
        }
      });
      vm.selectedYear = Moment(rows[0].date, "dd/mm/yyyy").year();
      var posts = rows.map(function (row) {return Ledger.add(vm.selectedYear, row);});
      $q.all(posts)
      .then(function(results) {
        logger.info('uploaded all transactions');
        console.log(results);
      });
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
  }
})();
