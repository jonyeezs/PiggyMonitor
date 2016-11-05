(function () {
  'use strict';

  angular
    .module('app.widgets')
    .controller('articleTrController', articleTrController);

  articleTrController.$inject = ['_', 'Budget'];
  function articleTrController(_ , Budget) {
    /* jshint validthis: true */
    var vm = this;

    vm.editable = false;
    vm.editting = false;
    vm.edit = edit;
    vm.save = save;
    vm.cancel = reset;

    vm.disableRemoveNeg = vm.articleType !== 'budget';

    function edit() {
      vm.editted = _.clone(vm.item);
      vm.editable = true;
    }

    function save() {
      if (vm.trForm.$dirty) {
        vm.editting = true;
        vm.item = vm.editted;
        Budget.update(vm.year, vm.item)
        .then(function() {
          vm.editable = false;
          vm.trForm.$setPristine();
        })
        .finally(function() {
          vm.editting = false;
        });;
      }
      else {
        reset();
      }
    }

    function reset() {
      vm.editable = false;
      vm.editted = vm.item;
      vm.trForm.$setPristine();
    }
  }
})();
