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

  function linkTd(scope, element, attr, model) {
    scope.$watch('editState', function (newState, oldState) {
      if(oldState.inProgress && !newState.inProgress) {
        if(!newState.commit) {
          model.$rollbackViewValue();
        }
      }
    })

    scope.updateModel = function () {
      model.$setViewValue(angular.copy(scope.tdData));
    };

    model.$formatters.push(function (value) {
      if (value) {
        scope.tdData = angular.copy(value);
      }
      return value;
    });
  }


  function ediTdCtrl($scope) {
    var ctrl = this;

    ctrl.updateTdData = function () {
      $scope.updateModel();
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
          apis.dataModel.$parsers.push(function(value) {
            apis.editTd.updateTdData();
            return true;
          })
        }
      };
      return directive;
    }
})();
