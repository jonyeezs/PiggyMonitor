(function () {
  'use strict';

  angular
    .module('app.widgets')
    .controller('articleTrController', articleTrController);

  articleTrController.$inject = ['_', 'Budget', 'Ledger'];
  function articleTrController(_ , Budget, Ledger) {
    /* jshint validthis: true */
    var vm = this;
    var EntryService = vm.articleType == 'budget' ? Budget : Ledger;

    vm.editable = false;
    vm.editting = false;
    vm.edit = edit;
    vm.save = save;
    vm.cancel = reset;

    function edit() {
      vm.editted = _.clone(vm.item);
      vm.editable = true;
    }

    function save(form) {
      if (form.$valid) {
        vm.editting = true;
        vm.item = vm.editted;
        EntryService.update(vm.year, vm.item)
        .then(function() {
          vm.editable = false;
          form.$setPristine();
        })
        .finally(function() {
          vm.editting = false;
        });
      }
    }

    function reset(form) {
      vm.editable = false;
      vm.editted = vm.item;
      form.$setPristine();
    }
  }
})();
