(function () {
  'use strict';

  angular
    .module('app.ledger')
    .component('ledgerUpload', {
      templateUrl: 'app/ledger/ledger-upload/ledger-upload.html',
      controller: ledgerUploadCtrl,
      bindings: {
        onUploadComplete: '&'
      }
    });

  ledgerUploadCtrl.$inject = ['LedgerUpload', 'moment'];

  function ledgerUploadCtrl(LedgerUpload, moment) {
    /* jshint validthis: true */
    var $ctrl = this;

    $ctrl.$onInit = function () {
      $ctrl.upload = upload;
    }

    function upload(file) {
      if (file) {
        LedgerUpload.getItemsFromCsv(file, processItems);
      }
    }

    function processItems(promisedResults) {
      promisedResults.then(function (results) {
        $ctrl.selectedYear = moment(results[0].date, "dd/mm/yyyy").year();
        return results;
      })
      .then(LedgerUpload.handleNoCategoryItems)
      .then(LedgerUpload.createEntries)
      .then(function (results) {
        $ctrl.onUploadComplete({uploadedYear: $ctrl.selectedYear});
      });
    }
  }
})();
