module.exports = ledgerUpload;

ledgerUpload.$inject = ['_', '$q', '$uibModal', 'actual', 'budget', 'moment', 'csv'];
function ledgerUpload(_, $q, $uibModal, actual, budget, moment, csv) {

  var service = {
    getItemsFromCsv: getItemsFromCsv,
    displayModalWithItemsAndCategories: displayModalWithItemsAndCategories,
    createEntries: createEntries
  };

  function getItemsFromCsv(file, completionCallback, progressCallback) {
    var reader = new FileReader();
    reader.onload = loadCompletedFile;
    reader.onprogress = handleProgress(progressCallback);
    reader.readAsText(file);

    function loadCompletedFile(event) {
      var csvFile = event.target.result;
      csv.parse(csvFile, function (err, output) {
        if (err != null) {
          completionCallback($q.reject(err));
        }
        var rows = output.map(function (row) {
          return {
            date: moment(row[0], 'DD-MM-YYYY')
              .toDate(),
              amount: parseInt(row[1]),
              description: row[2],
              category: ''
            }
        });
        completionCallback($q.resolve({
          items: rows,
          fileName: file.name,
          year: moment(rows[0].date, "dd/mm/yyyy").year()
        }));
      });
    };
  }

  function handleProgress(progressCallBack) {
    return function updateProgress(evt) {
      //- 20 to handle building items
      progressCallBack(evt.lengthComputable ? parseInt(((evt.loaded / evt.total) * 100), 10) - 20 : 30);
    };
  }

  function displayModalWithItemsAndCategories(results) {
    var items = results.items;
    return budget.getCategoriesForYear(items[0].date.getFullYear())
      .then(function (categories) {
        var modalPromises = $uibModal.open({
            animation: true,
            ariaLabeledy: 'Revise items',
            ariaDescribedBy: 'Make ammendments before submitting',
            backdrop: 'static',
            size: 'lg',
            component: 'itemCreationModal',
            resolve: {
              items: function () {
                return items;
              },
              categories: function () {
                return categories;
              },
              fileName: function () {
                return results.fileName;
              }
            }
          });
        return {
          result: modalPromises.result,
          opened: modalPromises.opened,
          rendered: modalPromises.rendered
        };
      });
  }

  function createEntries(itemsToUpload) {
    var posts = itemsToUpload.map(function (item) {
      return actual.add(item.date.getFullYear(), item);
    });
    return $q.all(posts)
      .then(function (results) {
        return results;
      });
  }

  return service;
}
