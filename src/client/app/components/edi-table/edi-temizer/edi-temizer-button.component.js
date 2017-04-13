module.exports = angular
  .module('edi-temizer.components')
  .component('ediTemizerButton', {
    template: '<button ng-show="$ctrl.showButton" class="btn btn-default btn-sm pull-right" ng-click="$ctrl.toggleItemizer()"><span class="glyphicon glyphicon-plus"></span></button>',
    controller: editemizerButtonCtrl
  });

editemizerButtonCtrl.$inject = ['$rootScope'];

function editemizerButtonCtrl($rootScope) {
  /* jshint validthis: true */
  var ctrl = this;
  var dispose = null;

  ctrl.$onInit = function () {
    ctrl.showButton = true;

    ctrl.toggleItemizer = function () {
      ctrl.showButton = !ctrl.showButton;
      // ed-Itemizier-Button-Toggler-Toggled!
      $rootScope.$emit('e.i.b.t.t');
    };

    // ed-Itemizier-Cancelled-Or-Done
    dispose = $rootScope.$on('e.i.c.o.d', function (event) {
      ctrl.showButton = true;
      event.stopPropagation();
    });
  }

  ctrl.$onDestroy = function () {
    if (dispose) {
      dispose();
    }
  }
}
