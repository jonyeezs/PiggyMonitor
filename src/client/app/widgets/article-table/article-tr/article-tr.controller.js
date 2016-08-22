(function () {
  'use strict';

  angular
    .module('app.widgets')
    .controller('articleTrController', articleTrController);

  articleTrController.$inject = ['_', 'occurances', 'budget'];

  /* @ngInject */
  function articleTrController(_ ,occurances, budget) {
    var vm = this;

    vm.editable = false;
    vm.occurances = occurances;
    vm.edit = edit;
    vm.save = save;
    vm.cancel = reset;

    function edit() {
      vm.editted = _.clone(vm.item);
      vm.editable = true;
    }

    function save() {
      if (vm.trForm.$dirty) {
        vm.item = vm.editted;
        budget.update(vm.year, vm.item)
        .then(function() {
          vm.editable = false;
          vm.trForm.$setPristine();
        });
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
