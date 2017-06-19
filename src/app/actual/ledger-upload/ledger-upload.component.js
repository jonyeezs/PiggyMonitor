module.exports = angular
    .module('actual.ledger-upload')
    .component('ledgerUpload', {
      template: require('./ledger-upload.html'),
      controller: ledgerUploadCtrl,
      bindings: {
        onUploadComplete: '&'
      }
    });

ledgerUploadCtrl.$inject = ['ledgerUpload'];
function ledgerUploadCtrl(LedgerUpload) {
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
      $ctrl.selectedYear = results.year;
      updateProgressBar(90);
      return results;
    })
    .then(LedgerUpload.displayModalWithItemsAndCategories)
    .then(function handleModalPromises(promises) {
      promises.opened.then(function() {
        updateProgressBar(93);
      })
      promises.rendered.then(function() {
        updateProgressBar(97);
      });
      return promises.result;
    })
    .then(function (isSuccessful) {
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
