(function () {
  angular
    .module('app.widgets')
    .component('dropOptions', {
      templateUrl: 'app/widgets/drop-options/drop-options.html',
      controller: dropOptionsCtrl,
      bindings: {
        availableOptions: '<options',
        selectionInfo: '<info',
        onSelect: '&'
      }
    });

  function dropOptionsCtrl() {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.selected = ctrl.selectionInfo;
    };

    ctrl.select = function (option) {
      ctrl.selected = option.key;
      ctrl.onSelect({ value: option.value });
    };
  }
})();
