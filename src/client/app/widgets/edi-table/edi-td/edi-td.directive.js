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
        tdSetup: '<colDetail',
        editState: '<'
      },
      controller: ediTdCtrl,
      require: 'ngModel',
      link: linkTd
    };
    return directive;
  }

  function linkTd(scope, ele, attr, model) {
    //var key = attr.$$element.context.parentNode.$$hashKey;
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


  function ediTdCtrl($scope) {
    var ctrl = this;

    ctrl.updateTdData = function (propName, value) {
      $scope.updateModel(propName, value);
    }
  }

  // Directive for the ngModel linked to the actual input
  angular.module('app.edi-table')
    .directive('ediTdData', editTdData);

    function editTdData() {
      var directive = {
        restrict: 'A',
        require: {
          editTd: '^ediTd',
          dataModel: 'ngModel'
        },
        link: function (scope, ele, attr, apis) {
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
