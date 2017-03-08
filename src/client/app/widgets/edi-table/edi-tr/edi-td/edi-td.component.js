(function () {
  'use strict';

  angular
      .module('app.edi-table')
      .component('ediTd', {
        templateUrl: 'app/widgets/edi-table/edi-tr/edi-td/edi-td.html',
        controller: ediTdCtrl,
        bindings: {
          trData: '<tdData',
          tdSetup: '<ediTdSetup',
          editting: '<?ediTdDisable',
          inEditMode: '<?ediTdEditMode',
          onEditChanges: '&?ediTdOnEditChanges'
        }
      });

  function ediTdCtrl() {
    var ctrl = this;

    ctrl.$onInit = function () {
      ctrl.editting = false;
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
  angular.module('app.edi-table')
    .directive('ediTdData', editTdData);

    editTdData.$inject = ['EdiTdMultiSelection'];
    function editTdData(EdiTdMultiSelection) {
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


          // var registeredIndex = null;
          //
          // // Create watcher on the parent level as an ng directive creates its own child scopes
          // var disposeMultiSelectOptionListener = scope.$watch('selectedForMulti', function(newValue) {
          //   if (newValue && registeredIndex == null) {
          //     registeredIndex = EdiTdMultiSelection.register(function(value) {
          //       apis.dataModel.$setViewValue(value);
          //       ele.val(value);
          //     }, apis.dataModel.$name);
          //
          //     ele.change(function() {
          //       EdiTdMultiSelection.updateValue(apis.dataModel.$name, registeredIndex, apis.dataModel.$viewValue);
          //     });
          //   }
          //   else {
          //     if (registeredIndex != null) {
          //       registeredIndex = EdiTdMultiSelection.unregister(apis.dataModel.$name, registeredIndex);
          //     }
          //   }
          // });
          //
          // scope.$on('$destroy', function(evt) {
          //   // Because the edit inputs are wrapped around the ngIf of editState.inProgress,
          //   // the ngModels for the inputs never get updated.
          //   // We have to trigger the saves before this gets destroyed.
          //   // the ngIf is the targetSscope which will be a child of edi-td.
          //   var toBeCommitted = evt.targetScope.$parent.editState.commit;
          //
          //   if (toBeCommitted) {
          //       ele.triggerHandler('saved');
          //   }
          //   else {
          //     apis.dataModel.$rollbackViewValue();
          //   }
          //
          //   if (registeredIndex != null) registeredIndex = EdiTdMultiSelection.unregister(apis.dataModel.$name, registeredIndex);
          //   if (typeof disposeInputChangeWatcher == 'function') disposeInputChangeWatcher();
          // });
        }
      };
      return directive;
    }
})();
