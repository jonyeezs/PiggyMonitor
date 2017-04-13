module.exports = angular.module('edi-tr.edi-td')
  .directive('ediTdData', editTdData)
  .component('ediTd', {
    templateUrl: 'app/components/edi-table/edi-tr/edi-td/edi-td.html',
    controller: ediTdCtrl,
    bindings: {
      trData: '<tdData',
      tdSetup: '<ediTdSetup',
      editting: '<?ediTdDisable',
      inEditMode: '<?ediTdEditMode',
      onEditChanges: '&?ediTdOnEditChanges'
    }
  })
  .name;

function ediTdCtrl() {
  var ctrl = this;

  ctrl.$onInit = function () {
    ctrl.editting = false;

    /**
     * returns changed object value to the on-edit-changes callback
     * @method updateTdData
     * @param  {Object}     change - a single item's property key-value pair that contains the changes
     */
    ctrl.updateTdData = function (change) {
      ctrl.onEditChanges({changeObj: change});
    }
  }

  ctrl.$onChanges = function (changes) {
    if (changes.trData && changes.trData.currentValue) {
      //create a new copy as we want to isolate this from trData
      ctrl.tdData = angular.copy(changes.trData.currentValue);
    }
  }
}

// Directive for the ngModel that's linked to the actual input
editTdData.$inject = [];
function editTdData() {
  var directive = {
    restrict: 'A',
    require: {
      editTd: '^ediTd',
      dataModel: 'ngModel'
    },
    link: function (scope, ele, attr, apis) {
      apis.dataModel.$viewChangeListeners.push(function sendViewToEdiTd() {
        // Using es6 computed properties: currently not working on IE11 and android
        // https://kangax.github.io/compat-table/es6/#test-object_literal_extensions_computed_properties
        apis.editTd.updateTdData({[apis.dataModel.$name]: apis.dataModel.$modelValue});
      })
    }
  };
  return directive;
}
