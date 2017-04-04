(function () {
  'use strict';

  angular
    .module('app.edi-table')
    .directive('ediTemizer', ediTemizer);

    ediTemizer.$inject = ['$compile'];

    function ediTemizer ($compile) {
      return {
        templateUrl: 'app/widgets/edi-table/edi-temizer/edi-temizer.html',
        restrict: 'A',
        controller: editTimizerCtrl,
        controllerAs: '$ctrl',
        scope: true,
        bindToController: {
          colSetup: '<',
          itemizerOnComplete: '&'
        }
      };
    };

  editTimizerCtrl.$inject = ['$rootScope'];

  function editTimizerCtrl($rootScope) {
    var ctrl = this;
    var dispose = null;
    ctrl.$onInit = function () {
      ctrl.save = save;
      ctrl.cancel = completeItemizer;
      ctrl.adding = false;
      ctrl.showForm = false;

      // ed-Itemizier-Button-Toggler-Toggled!
      dispose = $rootScope.$on('e.i.b.t.t', function (event) {
        ctrl.item = {};
        ctrl.showForm = true;
        event.stopPropagation();
      })
    }

    ctrl.$onDestroy = function () {
      if (dispose) {
        dispose();
      }
    }

    function save(isValidForm) {
      if (isValidForm) {
        ctrl.adding = true;
        var promise = ctrl.itemizerOnComplete({item: ctrl.item});

        if (promise && promise.then instanceof Function) {
          promise.then(function () {
            completeItemizer();
          });
        }
        else {
          completeItemizer();
        }
      }
    }

    function completeItemizer() {
      // ed-Itemizier-Cancelled-Or-Done
      $rootScope.$emit('e.i.c.o.d');
      ctrl.showForm = false;
      ctrl.adding = false;
    }
  }
})();
