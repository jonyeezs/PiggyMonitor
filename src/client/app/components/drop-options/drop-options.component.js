module.exports = angular
  .module('component.drop-options')
  .component('dropOptions', {
    templateUrl: 'app/components/drop-options/drop-options.html',
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

  ctrl.$onChanges = function(changes) {
    if (changes.availableOptions
        && (!changes.availableOptions.currentValue || changes.availableOptions.currentValue.length === 0)
        && changes.availableOptions.isFirstChange()) {
      ctrl.noList = true;
    }

    if (changes.availableOptions
        && (changes.availableOptions.currentValue && changes.availableOptions.currentValue.length > 0)) {
      ctrl.noList = false;
    }
  }

  ctrl.select = function (option) {
    ctrl.selected = option.key;
    ctrl.onSelect({ value: option.value });
  };
}
