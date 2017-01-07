(function () {
  'use strict';

  angular
    .module('app.widgets')
    .controller('articleItemizerController', articleItemizerController);

  articleItemizerController.$inject = ['_', 'Budget', 'Actual'];

  function articleItemizerController(_, Budget, Actual) {
    /* jshint validthis: true */
    var vm = this;
    var EntryService = vm.articleType == 'budget' ? Budget : Actual;

    vm.item = {};
    vm.save = save;
    vm.cancel = cancel;

    function save(formIsValid) {
      if (formIsValid) {
        vm.adding = true;
        EntryService.add(vm.year, vm.item)
          .then(function () {})
          .finally(function () {
            vm.onCreate();
            vm.adding = false;
          });
      }
    }

    function cancel() {
      vm.onCreate();
    }
  }
})();
