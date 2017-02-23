(function () {
  'use strict';

  angular
      .module('app.edi-table')
      .directive('ediTd', editd);

  function editd() {
    var directive = {
      templateUrl: 'app/widgets/edi-table/edi-td/edi-td.html',
      restrict: 'A',
      scope: {
        tdSetup: '<ediTdSetup',
        editState: '<ediTdState',
        selectedForMulti: '<?ediTdMultiSelect'
      },
      controller: ediTdCtrl,
      require: 'ngModel',
      link: linkTd
    };
    return directive;
  }

  function linkTd(scope, ele, attr, model) {
    model.$render = function viewToTdData() {
      if (model.$viewValue)
      {
        scope.tdData = model.$viewValue;
      }
    };

    scope.updateModel = function (propName, newValue) {
      scope.tdData[propName] = newValue;
      model.$setViewValue(scope.tdData);
    };
  }

  // API Controller of edi-td
  function ediTdCtrl($scope) {
    var ctrl = this;

    ctrl.updateTdData = function (propName, value) {
      $scope.updateModel(propName, value);
    }
  }

  // Directive for the ngModel that's linked to the actual input
  angular.module('app.edi-table')
    .directive('ediTdData', editTdData);

    editTdData.$inject = ['EdiTdMultiSelection'];
    function editTdData(EdiTdMultiSelection) {
      var directive = {
        restrict: 'A',
        scope: {
          selectedForMulti: '<?ediTdDataMulti'
        },
        require: {
          editTd: '^ediTd',
          dataModel: 'ngModel'
        },
        link: function (scope, ele, attr, apis) {
          var registeredIndex = null;

          // Create watcher on the parent level as an ng directive creates its own child scopes
          var disposeMultiSelectOptionListener = scope.$watch('selectedForMulti', function(newValue) {
            if (newValue && registeredIndex == null) {
              registeredIndex = EdiTdMultiSelection.register(function(value) {
                apis.dataModel.$setViewValue(value);
                ele.val(value);
              }, apis.dataModel.$name);

              ele.change(function() {
                EdiTdMultiSelection.updateValue(apis.dataModel.$name, registeredIndex, apis.dataModel.$viewValue);
              });
            }
            else {
              if (registeredIndex != null) {
                registeredIndex = EdiTdMultiSelection.unregister(apis.dataModel.$name, registeredIndex);
              }
            }
          });

          scope.$on('$destroy', function(evt) {
            // Because the edit inputs are wrapped around the ngIf of editState.inProgress,
            // the ngModels for the inputs never get updated.
            // We have to trigger the saves before this gets destroyed.
            // the ngIf is the targetSscope which will be a child of edi-td.
            var toBeCommitted = evt.targetScope.$parent.editState.commit;

            if (toBeCommitted) {
                ele.triggerHandler('saved');
            }
            else {
              apis.dataModel.$rollbackViewValue();
            }

            if (registeredIndex != null) registeredIndex = EdiTdMultiSelection.unregister(apis.dataModel.$name, registeredIndex);
            if (typeof disposeInputChangeWatcher == 'function') disposeInputChangeWatcher();
          });

          apis.dataModel.$parsers.push(function sendViewToEdiTd(viewModel) {
            apis.editTd.updateTdData(apis.dataModel.$name, viewModel);
            return viewModel;
          })
        }
      };
      return directive;
    }
})();
