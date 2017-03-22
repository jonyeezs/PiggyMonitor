(function () {
  'use strict';

  angular
    .module('app.actual')
    .component('ledgerUpload', {
      templateUrl: 'app/actual/ledger-upload/ledger-upload.html',
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
      $ctrl.uploadInProgress = false;
      $ctrl.uploadPercentage = 0;
    }

    function upload(file) {
      if (file) {
        $ctrl.uploadInProgress = true;
        LedgerUpload.getItemsFromCsv(file, processItems, updateProgressBar);
      }
    }

    function processItems(promisedResults) {
      promisedResults.then(function (results) {
        $ctrl.selectedYear = moment(results[0].date, "dd/mm/yyyy").year();
        updateProgressBar(90);
        return results;
      })
      .then(LedgerUpload.displayModalWithItemsAndCategories)
      .then(function handleModalPromises(promises) {
        promises.opened.then(function() {
          updateProgress(93);
        })
        promises.rendered.then(function() {
          updateProgress(97);
        });
        return promises.result;
      })
      .then(LedgerUpload.createEntries)
      .then(function (results) {
        updateProgressBar(100);
        $ctrl.onUploadComplete({uploadedYear: $ctrl.selectedYear});
      })
      .finally(function () {
        $ctrl.uploadInProgress = false;
      });
    }

    function updateProgressBar(percentageComplete) {
      $ctrl.uploadPercentage = percentageComplete;
    }
  }
})();
