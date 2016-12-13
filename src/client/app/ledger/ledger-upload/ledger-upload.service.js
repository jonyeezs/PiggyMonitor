(function () {
  'use strict';

  angular
    .module('app.ledger')
    .factory('LedgerUpload', ledgerUpload);

  ledgerUpload.$inject = ['_', '$q', '$uibModal', 'moment', 'Csv'];
  /* @ngInject */
  function ledgerUpload(_, $q, $uibModal, moment, Csv) {

    var service = {
      getItemsFromCsv: getItemsFromCsv,
      handleNoCategoryItems: handleNoCategoryItems
    };

    function getItemsFromCsv(file, callback) {
      var reader = new FileReader();
      reader.onload = loadCompletedFile;
      reader.readAsText(file);

      function loadCompletedFile(event) {
        var csv = event.target.result;
        var rows = Csv.parse(csv).map(function (row) {
          return {
            date: moment(row[0], 'DD-MM-YYYY').toDate(),
            amount: parseInt(row[1]),
            description: row[2],
            category: ''
          }
        });
        callback($q.resolve(rows));
      };
    }

    function handleNoCategoryItems(items) {
      var itemsWithNoCategory = _.filter(items, {'category': ''});

      return $uibModal.open({
        animation: true,
        ariaLabeledy: 'Revise items',
        ariaDescribedBy: 'Make ammendments before submitting',
        backdrop: 'static',
        size: 'lg',
        component: 'itemRevisionModal',
        resolve: {
          items: function () {
            return itemsWithNoCategory;
          }
        }
      }).result;
    }
    //
    // vm.selectedYear = Moment(rows[0].date, "dd/mm/yyyy").year();
    // var posts = rows.map(function (row) {
    //   return Ledger.add(vm.selectedYear, row);
    // });
    // $q.all(posts)
    //   .then(function (results) {
    //
    //   });
    return service;
  }
})();
