(function () {
  'use strict';

  angular
    .module('app.widgets')
    .controller('articleItemizerController', articleItemizerController);

  articleItemizerController.$inject = ['_', 'occurances', 'budget'];

  /* @ngInject */
  function articleItemizerController(_ ,occurances, budget) {
    /* jshint validthis: true */
    var vm = this;
    vm.item = {};
    vm.occurances = occurances;
    vm.save = save;
    vm.cancel = cancel;

    function save(formIsValid) {
      if (formIsValid) {
        vm.adding = true;
        budget.add(vm.year, vm.item)
        .then(function() {
        })
        .finally(function() {
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
